package main

import (
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"

	config "github.com/timiithy/pre-intern-task-telkom/database"
	"github.com/timiithy/pre-intern-task-telkom/handlers"
)

func main() {
	// Connect to database
	config.ConnectDB()

	// Migrate database
	config.MigrateDB()

	// Initialize Echo
	e := echo.New()

	// Middleware
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"http://localhost:3000"},
		AllowMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
	}))

	// Dashboard routes
	e.GET("/api/dashboard/stats", handlers.GetDashboardStats)
	e.GET("/api/dashboard/top-users", handlers.GetTopUsers)
	e.GET("/api/dashboard/top-books", handlers.GetTopBooks)

	// Buku routes
	e.GET("/api/buku", handlers.GetAllBuku)
	e.GET("/api/buku/:id", handlers.GetBukuByID)
	e.POST("/api/buku", handlers.CreateBuku)
	e.PUT("/api/buku/:id", handlers.UpdateBuku)
	e.DELETE("/api/buku/:id", handlers.DeleteBuku)

	// Pengguna routes
	e.GET("/api/pengguna", handlers.GetAllPengguna)
	e.GET("/api/pengguna/:id", handlers.GetPenggunaByID)
	e.POST("/api/pengguna", handlers.CreatePengguna)
	e.PUT("/api/pengguna/:id", handlers.UpdatePengguna)
	e.DELETE("/api/pengguna/:id", handlers.DeletePengguna)

	// Peminjaman routes
	e.GET("/api/peminjaman", handlers.GetAllPeminjaman)
	e.GET("/api/peminjaman/:id", handlers.GetPeminjamanByID)
	e.POST("/api/peminjaman", handlers.CreatePeminjaman)
	e.PUT("/api/peminjaman/:id/return", handlers.ReturnBook)
	e.DELETE("/api/peminjaman/:id", handlers.DeletePeminjaman)

	// Start server
	e.Logger.Fatal(e.Start(":8081"))
}
