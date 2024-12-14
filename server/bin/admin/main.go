package main

import (
	"log"
	"server/internal/admin/api"
	"server/internal/shared/config"
)

func main() {

	err := config.LoadConfig()
	if err != nil {
		log.Fatalf("Failed to load config: %v", err)
	}
	a := api.New()
	a.Start()
}
