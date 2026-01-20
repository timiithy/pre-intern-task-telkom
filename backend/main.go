package main

import (
	"os"

	"github.com/labstack/echo/v4"
	emiddleware "github.com/labstack/echo/v4/middleware"

	config "github.com/timiithy/pre-intern-task-telkom/database"
	"github.com/timiithy/pre-intern-task-telkom/handlers"
	authmw "github.com/timiithy/pre-intern-task-telkom/middleware"
)

func main() {
	// Connect & migrate DB
	config.ConnectDB()
	//config.MigrateDB()

	// Initialize Echo
	e := echo.New()

	// Global middleware
	e.Use(emiddleware.Logger())
	e.Use(emiddleware.Recover())
	e.Use(emiddleware.CORSWithConfig(emiddleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders: []string{"Content-Type", "Authorization"},
	}))

	e.GET("/health", func(c echo.Context) error {
		return c.JSON(200, map[string]string{"status": "ok"})
	})

	// Auth routes
	e.POST("/api/auth/login", handlers.Login)

	// Public routes (showcase nanti di sini)

	// User routes (RBAC)
	user := e.Group("/api", authmw.AuthRequired, authmw.RequireRole("user", "admin"))
	user.GET("/showcase/buku", handlers.GetAllBuku)
	user.GET("/showcase/buku/:id", handlers.GetBukuByID)

	// Admin routes (RBAC)
	admin := e.Group("/api", authmw.AuthRequired, authmw.RequireRole("admin"))

	// Dashboard routes (Admin)
	admin.GET("/dashboard/stats", handlers.GetDashboardStats)
	admin.GET("/dashboard/top-users", handlers.GetTopUsers)
	admin.GET("/dashboard/top-books", handlers.GetTopBooks)

	// Buku CRUD routes (Admin)
	admin.GET("/buku", handlers.GetAllBuku)
	admin.GET("/buku/:id", handlers.GetBukuByID)
	admin.POST("/buku", handlers.CreateBuku)
	admin.PUT("/buku/:id", handlers.UpdateBuku)
	admin.DELETE("/buku/:id", handlers.DeleteBuku)

	// Pengguna CRUD routes (Admin)
	admin.GET("/pengguna", handlers.GetAllPengguna)
	admin.GET("/pengguna/:id", handlers.GetPenggunaByID)
	admin.POST("/pengguna", handlers.CreatePengguna)
	admin.PUT("/pengguna/:id", handlers.UpdatePengguna)
	admin.DELETE("/pengguna/:id", handlers.DeletePengguna)

	// Peminjaman CRUD routes (Admin)
	admin.GET("/peminjaman", handlers.GetAllPeminjaman)
	admin.GET("/peminjaman/:id", handlers.GetPeminjamanByID)
	admin.POST("/peminjaman", handlers.CreatePeminjaman)
	admin.PUT("/peminjaman/:id/balikkin", handlers.BalikinBuku)
	admin.DELETE("/peminjaman/:id", handlers.DeletePeminjaman)

	// Start server
	port := os.Getenv("PORT")
	if port == "" {
		port = "8081"
	}
	e.Logger.Fatal(e.Start(":" + port))
}
