package handlers

import (
	"bytes"
	"encoding/json"
	"io"
	"net/http"
	"os"

	"github.com/labstack/echo/v4"
)

type LoginPayload struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func Login(c echo.Context) error {
	var payload LoginPayload
	if err := c.Bind(&payload); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "payload tidak valid"})
	}

	supabaseURL := os.Getenv("SUPABASE_URL")
	anonKey := os.Getenv("SUPABASE_ANON_KEY")
	if supabaseURL == "" || anonKey == "" {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "supabase env belum lengkap"})
	}

	body, _ := json.Marshal(map[string]string{
		"email":    payload.Email,
		"password": payload.Password,
	})

	req, _ := http.NewRequest("POST",
		supabaseURL+"/auth/v1/token?grant_type=password",
		bytes.NewBuffer(body),
	)
	req.Header.Set("apikey", anonKey)
	req.Header.Set("Authorization", "Bearer "+anonKey)
	req.Header.Set("Content-Type", "application/json")

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return c.JSON(http.StatusBadGateway, map[string]string{"error": "supabase auth gagal"})
	}
	defer resp.Body.Close()

	respBody, _ := io.ReadAll(resp.Body)
	return c.Blob(resp.StatusCode, "application/json", respBody)
}
