package config

import (
	"fmt"
	"os"
	"sync"

	"github.com/joho/godotenv"
)

var (
	AppConfig *Config
	once      sync.Once
)

type Config struct {
	DBHost         string
	DBPort         string
	DBUser         string
	DBPass         string
	DBName         string
	MinioHost      string
	MinioPort      string
	MinioAccessKey string
	MinioSecretKey string
	MinioUseSSL    bool
	Port           string
}

func LoadConfig() error {
	var err error
	once.Do(func() {
		err = loadConfig()
	})
	return err
}

func loadConfig() error {
	if err := godotenv.Load(); err != nil {
		return fmt.Errorf("failed to load .env file: %w", err)
	}

	AppConfig = &Config{
		DBHost: os.Getenv("DB_HOST"),
		DBPort: os.Getenv("DB_PORT"),
		DBUser: os.Getenv("DB_USER"),
		DBPass: os.Getenv("DB_PASS"),
		DBName: os.Getenv("DB_DB"),

		MinioHost:      os.Getenv("MINIO_HOST"),
		MinioPort:      os.Getenv("MINIO_PORT"),
		MinioAccessKey: os.Getenv("MINIO_ACCESS_KEY"),
		MinioSecretKey: os.Getenv("MINIO_SECRET_KEY"),
		MinioUseSSL:    os.Getenv("MINIO_USE_SSL") == "true",

		Port: os.Getenv("PORT"),
	}

	return nil
}
