package handlers

import (
	"math"
	"net/http"
	"time"

	"github.com/google/uuid"

	"github.com/labstack/echo/v4"
	config "github.com/timiithy/pre-intern-task-telkom/database"
	models "github.com/timiithy/pre-intern-task-telkom/model"
)

func GetAllPeminjaman(c echo.Context) error {
	updateStatusPengembalian()
	var peminjaman []models.Peminjaman
	if err := config.DB.Preload("Pengguna").Preload("Buku").Find(&peminjaman).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}
	return c.JSON(http.StatusOK, peminjaman)
}

func updateStatusPengembalian() {
	var overduePeminjaman []models.Peminjaman
	now := time.Now()
	config.DB.Where("tanggal_pengembalian < ? AND status = ?", now, "dipinjam").Find(&overduePeminjaman)
	for _, p := range overduePeminjaman {
		var buku models.Buku
		if err := config.DB.First(&buku, "id_buku = ?", p.IDBuku).Error; err == nil {
			buku.Stok += 1
			config.DB.Save(&buku)
		}
		p.Status = "selesai"
		config.DB.Save(&p)
	}
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
	var input models.CreatePeminjamanInput

	if err := c.Bind(&input); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{
			"error": "payload tidak valid",
		})
	}

	idPengguna, err := uuid.Parse(input.IDPengguna)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "id_pengguna tidak valid"})
	}

	idBuku, err := uuid.Parse(input.IDBuku)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "id_buku tidak valid"})
	}

	tanggalKembali, err := time.Parse("2006-01-02", input.TanggalPengembalian)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "format tanggal_pengembalian tidak valid"})
	}

	// --- AMBIL BUKU DULU DARI DB ---
	var buku models.Buku
	if err := config.DB.First(&buku, "id_buku = ?", idBuku).Error; err != nil {
		return c.JSON(http.StatusNotFound, map[string]string{"error": "Buku tidak ditemukan"})
	}

	// Cek stok buku
	if buku.Stok <= 0 {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Buku sedang tidak tersedia"})
	}

	now := time.Now()
	if tanggalKembali.Before(now) {
		return c.JSON(http.StatusBadRequest, map[string]string{
			"error": "tanggal pengembalian harus setelah tanggal pinjam",
		})
	}

	durasi := int16(
		math.Ceil(
			tanggalKembali.Sub(now).Hours() / 24,
		),
	)

	peminjaman := models.Peminjaman{
		IDPengguna:          idPengguna,
		IDBuku:              idBuku,
		TanggalPeminjaman:   &now,
		TanggalPengembalian: &tanggalKembali,
		Durasi:              durasi,
		Status:              "dipinjam",
	}

	if peminjaman.TanggalPengembalian != nil {
		duration := peminjaman.TanggalPengembalian.Sub(now)
		durasi := int(duration.Hours() / 24)
		peminjaman.Durasi = int16(durasi)
	}

	// Simpan peminjaman
	if err := config.DB.Create(&peminjaman).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

	// --- KURANGI STOK BUKU ---
	buku.Stok -= 1
	if err := config.DB.Save(&buku).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

	config.DB.Preload("Pengguna").Preload("Buku").
		First(&peminjaman, "id_peminjaman = ?", peminjaman.IDPeminjaman)

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

	// Isi ulang stok buku
	var buku models.Buku
	if err := config.DB.First(&buku, "id_buku = ?", peminjaman.IDBuku).Error; err == nil {
		buku.Stok += 1
		config.DB.Save(&buku)
	}

	if err := config.DB.Preload("Pengguna").Preload("Buku").First(&peminjaman, "id_peminjaman = ?", peminjaman.IDPeminjaman).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

	return c.JSON(http.StatusOK, peminjaman)
}

// deprecated cuman jaga-jaga simpen aja hehe
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
