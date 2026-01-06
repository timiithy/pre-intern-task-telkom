package handlers

import (
	"net/http"

	"github.com/labstack/echo/v4"
	config "github.com/timiithy/pre-intern-task-telkom/database"
	models "github.com/timiithy/pre-intern-task-telkom/model"
)

/* ===================== STATS ===================== */

func GetDashboardStats(c echo.Context) error {
	var stats models.Dashboard

	// total buku
	config.DB.Model(&models.Buku{}).Count(&stats.TotalBuku)

	// total user
	config.DB.Model(&models.Pengguna{}).Count(&stats.TotalUser)

	// total peminjaman (semua record)
	config.DB.Model(&models.Peminjaman{}).Count(&stats.TotalPeminjaman)

	// buku yang sedang dipinjam (belum returned)
	config.DB.Model(&models.Peminjaman{}).
		Where("returned_at IS NULL").
		Count(&stats.BukuDipinjam)

	return c.JSON(http.StatusOK, stats)
}

/* ===================== TOP USERS (SUM DURASI) ===================== */

func GetTopUsers(c echo.Context) error {
	var topUsers []models.TopPengguna

	err := config.DB.Table("peminjaman").
		Select(`
			pengguna.id_pengguna,
			pengguna.nama,
			COALESCE(SUM(peminjaman.durasi), 0) AS total_hari
		`).
		Joins("JOIN pengguna ON peminjaman.id_pengguna = pengguna.id_pengguna").
		Group("pengguna.id_pengguna, pengguna.nama").
		Order("total_hari DESC").
		Limit(10).
		Scan(&topUsers).Error

	if err != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{
			"error": err.Error(),
		})
	}

	return c.JSON(http.StatusOK, topUsers)
}

/* ===================== TOP BOOKS (SUM DURASI) ===================== */

func GetTopBooks(c echo.Context) error {
	var topBooks []models.TopBuku

	err := config.DB.Table("peminjaman").
		Select(`
			buku.id_buku,
			buku.nama_buku,
			COALESCE(SUM(peminjaman.durasi), 0) AS total_hari
		`).
		Joins("JOIN buku ON peminjaman.id_buku = buku.id_buku").
		Group("buku.id_buku, buku.nama_buku").
		Order("total_hari DESC").
		Limit(10).
		Scan(&topBooks).Error

	if err != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{
			"error": err.Error(),
		})
	}

	return c.JSON(http.StatusOK, topBooks)
}
