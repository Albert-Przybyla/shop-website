package database

import (
	"log"
	"server/internal/shared/config"

	model "server/internal/shared/model"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type Postgres struct {
	db *gorm.DB
}

func New() *Postgres {
	connStr := "host=" + config.AppConfig.DBHost + " user=" + config.AppConfig.DBUser + " password=" + config.AppConfig.DBPass +
		" dbname=" + config.AppConfig.DBName + " port=" + config.AppConfig.DBPort + " sslmode=disable TimeZone=Europe/Warsaw"

	db, err := gorm.Open(postgres.Open(connStr), &gorm.Config{})
	if err != nil {
		log.Fatalln("Failed to connect to the database:", err)
		return nil
	}

	postgres := &Postgres{
		db: db,
	}
	err = postgres.Init()
	if err != nil {
		log.Fatalln("Failed to initialize database:", err)
		return nil
	}

	return postgres
}
func (s *Postgres) Init() error {
	err := s.Migrate()

	if err != nil {
		return err
	}
	return nil
}

func (s *Postgres) Migrate() error {
	err := s.db.AutoMigrate(
		&model.Order{},
		&model.OrderProduct{},
		&model.Product{},
		&model.Admin{},
		&model.ProductPhoto{},
		&model.Size{},
		&model.DeliveryMethod{},
		&model.OrderReturn{},
		&model.Code{},
	)

	if err != nil {
		return err
	}

	return s.createDefaultAdmin()
}
