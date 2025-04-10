package main

import (
	"log"
	"server/internal/shared/config"
	"server/internal/user/api"
)

func main() {

	err := config.LoadConfig()
	if err != nil {
		log.Fatalf("Failed to load config: %v", err)
	}
	a := api.New()
	a.Start()
}
