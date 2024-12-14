package model

import (
	product "server/internal/shared/model/product"
	"time"
)

type Order struct {
	Id         string            `gorm:"primaryKey;type:uuid;default:gen_random_uuid()" json:"id"`
	FirstName  string            `gorm:"not null" json:"first_name"`
	LastName   string            `gorm:"not null" json:"last_name"`
	Email      string            `gorm:"not null" json:"email"`
	TotalPrice float64           `gorm:"not null" json:"total_price"`
	Status     string            `gorm:"not null" json:"status"`
	Address    string            `gorm:"not null" json:"address"`
	PostalCode string            `gorm:"not null" json:"post_code"`
	City       string            `gorm:"not null" json:"city"`
	Country    string            `gorm:"not null" json:"country"`
	Products   []product.Product `gorm:"many2many:order_products" json:"products"`
	CreatedAt  time.Time         `gorm:"autoCreateTime" json:"created_at"`
	UpdatedAt  time.Time         `gorm:"autoUpdateTime" json:"updated_at"`
}
