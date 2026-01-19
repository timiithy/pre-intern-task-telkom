package middleware

import (
	"net/http"

	"github.com/golang-jwt/jwt/v5"
	"github.com/labstack/echo/v4"
)

func RequireRole(allowedRoles ...string) echo.MiddlewareFunc {
	roleSet := map[string]struct{}{}
	for _, r := range allowedRoles {
		roleSet[r] = struct{}{}
	}

	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			u := c.Get("user")
			token, ok := u.(*jwt.Token)
			if !ok || !token.Valid {
				return c.JSON(http.StatusUnauthorized, map[string]string{"error": "invalid token"})
			}

			claims, ok := token.Claims.(jwt.MapClaims)
			if !ok {
				return c.JSON(http.StatusUnauthorized, map[string]string{"error": "invalid claims"})
			}

			roleVal, ok := claims["role"].(string)
			if !ok {
				return c.JSON(http.StatusForbidden, map[string]string{"error": "role not found"})
			}

			if _, ok := roleSet[roleVal]; !ok {
				return c.JSON(http.StatusForbidden, map[string]string{"error": "forbidden"})
			}

			return next(c)
		}
	}
}
