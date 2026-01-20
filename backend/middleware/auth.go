package middleware

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"strings"
	"sync"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/labstack/echo/v4"
	"github.com/lestrrat-go/jwx/v2/jwk"
)

var (
	jwksMutex   sync.Mutex
	jwksSet     jwk.Set
	jwksFetched time.Time
)

func getSupabaseJWKS(ctx context.Context, supabaseURL string) (jwk.Set, error) {
	jwksMutex.Lock()
	defer jwksMutex.Unlock()

	// simple cache to avoid fetching keys on every request
	if jwksSet != nil && time.Since(jwksFetched) < 10*time.Minute {
		return jwksSet, nil
	}

	base := strings.TrimRight(strings.TrimSpace(supabaseURL), "/")
	if base == "" {
		return nil, fmt.Errorf("SUPABASE_URL is empty")
	}

	jwksURL := base + "/auth/v1/.well-known/jwks.json"

	req, err := http.NewRequestWithContext(ctx, http.MethodGet, jwksURL, nil)
	if err != nil {
		return nil, err
	}

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode < 200 || resp.StatusCode >= 300 {
		return nil, fmt.Errorf("jwks fetch failed: %s", resp.Status)
	}

	set, err := jwk.ParseReader(resp.Body)
	if err != nil {
		return nil, err
	}

	jwksSet = set
	jwksFetched = time.Now()
	return jwksSet, nil
}

func AuthRequired(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		auth := c.Request().Header.Get("Authorization")
		if !strings.HasPrefix(auth, "Bearer ") {
			return c.JSON(http.StatusUnauthorized, map[string]string{"error": "missing token"})
		}

		tokenStr := strings.TrimSpace(strings.TrimPrefix(auth, "Bearer "))
		tokenStr = strings.Trim(tokenStr, `"`)

		supabaseURL := strings.TrimSpace(os.Getenv("SUPABASE_URL"))
		if supabaseURL == "" {
			return c.JSON(http.StatusInternalServerError, map[string]string{"error": "missing SUPABASE_URL"})
		}

		// Accept Supabase-style tokens (your token is ES256)
		parser := jwt.NewParser(jwt.WithValidMethods([]string{
			jwt.SigningMethodES256.Alg(),
			jwt.SigningMethodRS256.Alg(), // safe to allow if Supabase rotates to RSA
		}))
		token, err := parser.Parse(tokenStr, func(t *jwt.Token) (interface{}, error) {
			kid, _ := t.Header["kid"].(string)
			if strings.TrimSpace(kid) == "" {
				return nil, fmt.Errorf("missing kid")
			}

			set, err := getSupabaseJWKS(c.Request().Context(), supabaseURL)
			if err != nil {
				return nil, err
			}

			key, ok := set.LookupKeyID(kid)
			if !ok {
				return nil, fmt.Errorf("no jwk for kid=%s", kid)
			}

			var pub interface{}
			if err := key.Raw(&pub); err != nil {
				return nil, err
			}
			return pub, nil
		})
		if err != nil || token == nil || !token.Valid {
			return c.JSON(http.StatusUnauthorized, map[string]string{"error": "invalid token"})
		}

		claims, ok := token.Claims.(jwt.MapClaims)
		if !ok {
			return c.JSON(http.StatusUnauthorized, map[string]string{"error": "invalid claims"})
		}

		// Your token has: app_metadata.role = "admin"
		role := "user"
		if r, ok := claims["role"].(string); ok && strings.TrimSpace(r) != "" {
			role = strings.TrimSpace(r)
		}
		if appMeta, ok := claims["app_metadata"].(map[string]interface{}); ok {
			if r, ok := appMeta["role"].(string); ok && strings.TrimSpace(r) != "" {
				role = strings.TrimSpace(r)
			}
		}
		if role == "authenticated" {
			role = "user"
		}
		c.Set("role", role)
		c.Set("sub", claims["sub"])
		return next(c)
	}
}

func RequireRole(roles ...string) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			role, _ := c.Get("role").(string)
			for _, r := range roles {
				if role == r {
					return next(c)
				}
			}
			return c.JSON(http.StatusForbidden, map[string]string{"error": "forbidden"})
		}
	}
}
