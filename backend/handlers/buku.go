package handlers

import (
	"net/http"

	"github.com/labstack/echo/v4"
	config "github.com/timiithy/pre-intern-task-telkom/database"
	models "github.com/timiithy/pre-intern-task-telkom/model"
)

func GetAllBuku(c echo.Context) error {
	var buku []models.Buku
	if err := config.DB.Find(&buku).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}
	return c.JSON(http.StatusOK, buku)
}

func GetBukuByID(c echo.Context) error {
	id := c.Param("id")
	var buku models.Buku
	if err := config.DB.First(&buku, "id_buku = ?", id).Error; err != nil {
		return c.JSON(http.StatusNotFound, map[string]string{"error": "Book not found"})
	}
	return c.JSON(http.StatusOK, buku)
}

func CreateBuku(c echo.Context) error {
	buku := new(models.Buku)
	if err := c.Bind(buku); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	if err := config.DB.Create(&buku).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}
	return c.JSON(http.StatusCreated, buku)
}

func UpdateBuku(c echo.Context) error {
	id := c.Param("id")
	var buku models.Buku

	if err := config.DB.First(&buku, "id_buku = ?", id).Error; err != nil {
		return c.JSON(http.StatusNotFound, map[string]string{"error": "Book not found"})
	}

	if err := c.Bind(&buku); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	if err := config.DB.Save(&buku).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}
	return c.JSON(http.StatusOK, buku)
}

func DeleteBuku(c echo.Context) error {
	id := c.Param("id")

	if err := config.DB.Delete(&models.Buku{}, "id_buku = ?", id).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}
	return c.JSON(http.StatusOK, map[string]string{"message": "Book deleted successfully"})
}
