package config

import (
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	models "github.com/timiithy/pre-intern-task-telkom/model"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDB() {
	if err := godotenv.Load(); err != nil {
		log.Println("Warning: No .env")
	}

	dsn := os.Getenv("DB_URL")
	if dsn == "" {
		log.Fatal("Missing URL at .env")
	}
	var err error
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{
		DisableForeignKeyConstraintWhenMigrating: true,
	})
	if err != nil {
		panic("Failed: " + err.Error())
	}

	fmt.Println("We're in!")
}

func MigrateDB() {
	if DB == nil {
		log.Fatal("database is not connected")
	}

	if err := DB.AutoMigrate(
		&models.Buku{},
		&models.Pengguna{},
		&models.Peminjaman{},
	); err != nil {
		log.Fatalf("failed to migrate database: %v", err)
	}
}
