package model

import (
	"time"
)

type Status string

// RoleAdmin   UserRole = "admin"
const (
	Unverified Status = "unverified"
	Verified   Status = "verified"
	Confirmed  Status = "confirmed"
	Shipped    Status = "shipped"
	Completed  Status = "completed"
	Cancelled  Status = "cancelled"
)

type Order struct {
	Id               string    `gorm:"primaryKey;type:uuid;default:gen_random_uuid()" json:"id"`
	FirstName        string    `gorm:"not null" json:"first_name"`
	LastName         string    `gorm:"not null" json:"last_name"`
	Email            string    `gorm:"not null" json:"email"`
	TotalPrice       float64   `gorm:"not null" json:"total_price"`
	Phone            string    `gorm:"not null" json:"phone"`
	ConfirmationCode string    `gorm:"not null" json:"confirmation_code"`
	Status           Status    `gorm:"not null" json:"status"`
	Address          string    `gorm:"not null" json:"address"`
	PostalCode       string    `gorm:"not null" json:"postal_code"`
	City             string    `gorm:"not null" json:"city"`
	Country          string    `gorm:"not null" json:"country"`
	Products         []Product `gorm:"many2many:order_products" json:"products"`
	CreatedAt        time.Time `gorm:"autoCreateTime" json:"created_at"`
	UpdatedAt        time.Time `gorm:"autoUpdateTime" json:"updated_at"`
}

type CreateOrderRequest struct {
	FirstName  string   `json:"first_name"`
	LastName   string   `json:"last_name"`
	Email      string   `json:"email"`
	Phone      string   `json:"phone"`
	Address    string   `json:"address"`
	PostalCode string   `json:"postal_code"`
	City       string   `json:"city"`
	Country    string   `json:"country"`
	Products   []string `json:"products"`
}
