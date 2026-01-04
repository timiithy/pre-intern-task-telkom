package config

import (
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
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
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("Failed: " + err.Error())
	}

	fmt.Println("We're in!")
}
