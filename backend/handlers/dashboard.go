package handlers

import (
	"net/http"

	"github.com/labstack/echo/v4"
	config "github.com/timiithy/pre-intern-task-telkom/database"
	models "github.com/timiithy/pre-intern-task-telkom/model"
)

func GetDashboardStats(c echo.Context) error {
	var stats models.Dashboard

	config.DB.Model(&models.Buku{}).Count(&stats.TotalBuku)
	config.DB.Model(&models.Pengguna{}).Count(&stats.TotalUser)
	config.DB.Model(&models.Peminjaman{}).Where("returned_at IS NULL").Count(&stats.TotalPinjam)

	return c.JSON(http.StatusOK, stats)
}

func GetTopUsers(c echo.Context) error {
	var topUsers []models.TopPengguna

	err := config.DB.Table("peminjaman").
		Select("pengguna.id_pengguna, pengguna.nama, COUNT(peminjaman.id_peminjaman) as total_pinjam").
		Joins("JOIN pengguna ON peminjaman.id_pengguna = pengguna.id_pengguna").
		Group("pengguna.id_pengguna, pengguna.nama").
		Order("total_pinjam DESC").
		Limit(10).
		Scan(&topUsers).Error

	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

	return c.JSON(http.StatusOK, topUsers)
}

func GetTopBooks(c echo.Context) error {
	var topBooks []models.TopBuku

	err := config.DB.Table("peminjaman").
		Select("buku.id_buku, buku.nama_buku, COUNT(peminjaman.id_peminjaman) as total_pinjam").
		Joins("JOIN buku ON peminjaman.id_buku = buku.id_buku").
		Group("buku.id_buku, buku.nama_buku").
		Order("total_pinjam DESC").
		Limit(10).
		Scan(&topBooks).Error

	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

	return c.JSON(http.StatusOK, topBooks)
}

func GetAverageBorrowingDuration(c echo.Context) error {
	var avgDuration float64

	err := config.DB.Model(&models.Peminjaman{}).
		Select("AVG(durasi)").
		Where("returned_at IS NOT NULL").
		Scan(&avgDuration).Error

	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

	return c.JSON(http.StatusOK, map[string]float64{"average_duration": avgDuration})
}
