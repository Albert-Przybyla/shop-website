package model

import "time"

type Order struct {
	Id         string    `gorm:"primaryKey;type:uuid;default:gen_random_uuid()" json:"id"`
	FirstName  string    `json:"first_name"`
	LastName   string    `json:"last_name"`
	Email      string    `json:"email"`
	TotalPrice float64   `json:"total_price"`
	Status     string    `json:"status"`
	Address    string    `json:"address"`
	PostalCode string    `json:"post_code"`
	City       string    `json:"city"`
	Country    string    `json:"country"`
	ProductIds []string  `json:"products_ids"`
	CreatedAt  time.Time `gorm:"autoCreateTime" json:"created_at"`
	UpdatedAt  time.Time `gorm:"autoUpdateTime" json:"updated_at"`
}
