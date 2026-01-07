package handlers

import (
	"net/http"
	"time"

	"github.com/labstack/echo/v4"
	config "github.com/timiithy/pre-intern-task-telkom/database"
	models "github.com/timiithy/pre-intern-task-telkom/model"
)

func GetAllPeminjaman(c echo.Context) error {
	var peminjaman []models.Peminjaman
	if err := config.DB.Preload("Pengguna").Preload("Buku").Find(&peminjaman).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}
	return c.JSON(http.StatusOK, peminjaman)
}

func GetPeminjamanByID(c echo.Context) error {
	id := c.Param("id")
	var peminjaman models.Peminjaman
	if err := config.DB.Preload("Pengguna").Preload("Buku").First(&peminjaman, "id_peminjaman = ?", id).Error; err != nil {
		return c.JSON(http.StatusNotFound, map[string]string{"error": "Borrowing record not found"})
	}
	return c.JSON(http.StatusOK, peminjaman)
}

func CreatePeminjaman(c echo.Context) error {
	peminjaman := new(models.Peminjaman)
	if err := c.Bind(peminjaman); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	now := time.Now()
	peminjaman.TanggalPeminjaman = &now

	if err := config.DB.Create(&peminjaman).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

	config.DB.Preload("Pengguna").Preload("Buku").First(&peminjaman, "id_peminjaman = ?", peminjaman.IDPeminjaman)

	return c.JSON(http.StatusCreated, peminjaman)
}

func DeletePeminjaman(c echo.Context) error {
	id := c.Param("id")

	if err := config.DB.Delete(&models.Peminjaman{}, "id_peminjaman = ?", id).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}
	return c.JSON(http.StatusOK, map[string]string{"message": "Borrowing record deleted successfully"})
}

func BalikinBuku(c echo.Context) error {
	id := c.Param("id")

	var peminjaman models.Peminjaman
	if err := config.DB.Preload("Pengguna").Preload("Buku").First(&peminjaman, "id_peminjaman = ?", id).Error; err != nil {
		return c.JSON(http.StatusNotFound, map[string]string{"error": "Borrowing record not found"})
	}

	if peminjaman.TanggalPengembalian != nil {
		return c.JSON(http.StatusOK, peminjaman)
	}

	now := time.Now()
	peminjaman.TanggalPengembalian = &now

	if err := config.DB.Save(&peminjaman).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

	if err := config.DB.Preload("Pengguna").Preload("Buku").First(&peminjaman, "id_peminjaman = ?", peminjaman.IDPeminjaman).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

	return c.JSON(http.StatusOK, peminjaman)
}

func GetDurasi(c echo.Context) error {
	id := c.Param("id")
	var peminjaman models.Peminjaman
	if err := config.DB.First(&peminjaman, "id_peminjaman = ?", id).Error; err != nil {
		return c.JSON(http.StatusNotFound, map[string]string{"error": "Tidak ditemukan peminjaman"})
	}
	var durasi int
	if peminjaman.TanggalPeminjaman != nil && peminjaman.TanggalPengembalian != nil {
		duration := peminjaman.TanggalPengembalian.Sub(*peminjaman.TanggalPeminjaman)
		durasi = int(duration.Hours() / 24)
	}

	return c.JSON(http.StatusOK, map[string]int{"durasi": durasi})
}
