package model

import (
	"time"
)

type Product struct {
	Id                   string         `gorm:"primaryKey;type:uuid;default:gen_random_uuid()" json:"id"`
	Name                 string         `gorm:"not null" json:"name"`
	Description          string         `gorm:"not null" json:"description"`
	AditionalDescription string         `gorm:"not null" json:"aditional_description"`
	Material             string         `gorm:"not null" json:"material"`
	Price                int            `gorm:"not null" json:"price"`
	Discount             int            `grom:"null" json:"discount"`
	CreatedAt            time.Time      `gorm:"autoCreateTime" json:"created_at"`
	UpdatedAt            time.Time      `gorm:"autoUpdateTime" json:"updated_at"`
	Photos               []ProductPhoto `gorm:"foreignKey:ProductId" json:"photos"`
	Sizes                []Size         `gorm:"many2many:product_sizes" json:"sizes"`
}

type Size struct {
	Id        string    `gorm:"primaryKey;type:uuid;default:gen_random_uuid()" json:"id"`
	Label     string    `gorm:"not null;unique" json:"label"`
	Products  []Product `gorm:"many2many:product_sizes" json:"products"`
	CreatedAt time.Time `gorm:"autoCreateTime" json:"created_at"`
	UpdatedAt time.Time `gorm:"autoUpdateTime" json:"updated_at"`
}

type SizeRequest struct {
	Label string `json:"label"`
}

type ProductRequest struct {
	Name                 string  `json:"name"`
	Description          string  `json:"description"`
	AditionalDescription string  `json:"aditional_description"`
	Material             string  `json:"material"`
	Price                float64 `json:"price"`
}

type ProductSetDiscountRequest struct {
	Discount int `json:"discount"`
}

type ProductUserResponse struct {
	ID                   string         `json:"id"`
	Name                 string         `json:"name"`
	Description          string         `json:"description"`
	AditionalDescription string         `json:"aditional_description"`
	Material             string         `json:"material"`
	Price                int            `json:"price"`
	Discount             int            `json:"discount"`
	Photos               []ProductPhoto `json:"photos"`
	Sizes                []Size         `json:"sizes"`
}

type ProductPhoto struct {
	Id        string    `gorm:"primaryKey;type:uuid;default:gen_random_uuid()" json:"id"`
	ProductId string    `gorm:"type:uuid;not null" json:"product_id"`
	Url       string    `gorm:"not null" json:"url"`
	Order     int       `gorm:"not null" json:"order"`
	CreatedAt time.Time `gorm:"autoCreateTime" json:"created_at"`
	UpdatedAt time.Time `gorm:"autoUpdateTime" json:"updated_at"`
}
