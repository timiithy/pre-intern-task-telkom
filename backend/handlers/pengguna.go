package handlers

import (
	"net/http"

	"github.com/labstack/echo/v4"
	config "github.com/timiithy/pre-intern-task-telkom/database"
	models "github.com/timiithy/pre-intern-task-telkom/model"
)

func GetAllPengguna(c echo.Context) error {
	var pengguna []models.Pengguna
	if err := config.DB.Find(&pengguna).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}
	return c.JSON(http.StatusOK, pengguna)
}

func GetPenggunaByID(c echo.Context) error {
	id := c.Param("id")
	var pengguna models.Pengguna
	if err := config.DB.First(&pengguna, "id_pengguna = ?", id).Error; err != nil {
		return c.JSON(http.StatusNotFound, map[string]string{"error": "User not found"})
	}
	return c.JSON(http.StatusOK, pengguna)
}

func CreatePengguna(c echo.Context) error {
	pengguna := new(models.Pengguna)
	if err := c.Bind(pengguna); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	if err := config.DB.Create(&pengguna).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}
	return c.JSON(http.StatusCreated, pengguna)
}

func UpdatePengguna(c echo.Context) error {
	id := c.Param("id")
	var pengguna models.Pengguna

	if err := config.DB.First(&pengguna, "id_pengguna = ?", id).Error; err != nil {
		return c.JSON(http.StatusNotFound, map[string]string{"error": "User not found"})
	}

	if err := c.Bind(&pengguna); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	if err := config.DB.Save(&pengguna).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}
	return c.JSON(http.StatusOK, pengguna)
}

func DeletePengguna(c echo.Context) error {
	id := c.Param("id")

	if err := config.DB.Delete(&models.Pengguna{}, "id_pengguna = ?", id).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}
	return c.JSON(http.StatusOK, map[string]string{"message": "User deleted successfully"})
}
