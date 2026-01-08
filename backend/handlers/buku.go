package handlers

import (
	"errors"
	"net/http"

	"github.com/labstack/echo/v4"
	config "github.com/timiithy/pre-intern-task-telkom/database"
	models "github.com/timiithy/pre-intern-task-telkom/model"
	"gorm.io/gorm"
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
	var payload struct {
		NamaBuku string `json:"nama_buku" validate:"required"`
		Stok     int16  `json:"stok" validate:"required,gte=0"`
	}

	if err := c.Bind(&payload); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	if payload.NamaBuku == "" {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "NamaBuku is required"})
	}

	if payload.Stok <= 0 {
		payload.Stok = 1
	}

	var existing models.Buku
	err := config.DB.Where("nama_buku = ?", payload.NamaBuku).First(&existing).Error

	switch {
	case err == nil:
		existing.Stok += payload.Stok
		if err := config.DB.Save(&existing).Error; err != nil {
			return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
		}
		return c.JSON(http.StatusOK, existing)
	case errors.Is(err, gorm.ErrRecordNotFound):
		newBuku := models.Buku{
			NamaBuku: payload.NamaBuku,
			Stok:     payload.Stok,
		}
		if err := config.DB.Create(&newBuku).Error; err != nil {
			return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
		}
		return c.JSON(http.StatusCreated, newBuku)
	default:
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

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

	// cek apakah buku sedang dipinjam
	var count int64
	if err := config.DB.Model(&models.Peminjaman{}).
		Where("id_buku = ? AND status = ?", id, "dipinjam").
		Count(&count).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

	if count > 0 {
		// masih ada peminjaman aktif untuk buku ini
		return c.JSON(http.StatusBadRequest, map[string]string{
			"error": "Buku tidak dapat dihapus karena sedang dipinjam",
		})
	}

	// aman untuk dihapus
	if err := config.DB.Delete(&models.Buku{}, "id_buku = ?", id).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

	return c.JSON(http.StatusOK, map[string]string{"message": "Book deleted successfully"})
}
