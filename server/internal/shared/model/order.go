package model

import (
	"time"
)

type Status string

const (
	Unverified Status = "unverified"
	Verified   Status = "verified"
	Paid       Status = "paid"
	Shipped    Status = "shipped"
	Completed  Status = "completed"
	Cancelled  Status = "cancelled"
)

type Order struct {
	Id                           string         `gorm:"primaryKey;type:uuid;default:gen_random_uuid()" json:"id"`
	FirstName                    string         `gorm:"not null" json:"first_name"`
	LastName                     string         `gorm:"not null" json:"last_name"`
	Email                        string         `gorm:"not null" json:"email"`
	DeliveryPrice                int            `gorm:"not null" json:"delivery_price"`
	TotalPrice                   int            `gorm:"not null" json:"total_price"`
	Phone                        string         `gorm:"not null" json:"phone"`
	ConfirmationCode             string         `gorm:"not null" json:"confirmation_code"`
	Status                       Status         `gorm:"not null" json:"status"`
	Address                      string         `gorm:"not null" json:"address"`
	PostalCode                   string         `gorm:"not null" json:"postal_code"`
	City                         string         `gorm:"not null" json:"city"`
	Country                      string         `gorm:"not null" json:"country"`
	DeliveryMethodId             string         `gorm:"not null" json:"delivery_method_id"`
	DeliveryMethod               DeliveryMethod `gorm:"foreignKey:DeliveryMethodId" json:"delivery_method"`
	DeliveryMethodAdditionalInfo string         `json:"delivery_method_additional_info"`
	Note                         string         `json:"note"`
	Products                     []OrderProduct `gorm:"foreignKey:OrderId" json:"products"`
	CreatedAt                    time.Time      `gorm:"autoCreateTime" json:"created_at"`
	UpdatedAt                    time.Time      `gorm:"autoUpdateTime" json:"updated_at"`
	OrderCode                    *string        `gorm:"type:varchar;nullable" json:"order_code"`
	Code                         *Code          `gorm:"foreignKey:OrderCode" json:"code"`
}

type OrderProduct struct {
	OrderId   string  `gorm:"primaryKey" json:"order_id"`
	ProductId string  `gorm:"primaryKey" json:"product_id"`
	Quantity  int     `gorm:"not null" json:"quantity"`
	SizeId    string  `gorm:"not null" json:"size_id"`
	Size      Size    `gorm:"foreignKey:SizeId" json:"size"`
	Product   Product `gorm:"foreignKey:ProductId" json:"product"`
}

type CreateOrderRequest struct {
	FirstName                    string                `json:"first_name"`
	LastName                     string                `json:"last_name"`
	Email                        string                `json:"email"`
	Phone                        string                `json:"phone"`
	Address                      string                `json:"address"`
	PostalCode                   string                `json:"postal_code"`
	City                         string                `json:"city"`
	Country                      string                `json:"country"`
	Products                     []OrderProductRequest `json:"products"`
	DeliveryMethodId             string                `json:"delivery_method_id"`
	DeliveryMethodAdditionalInfo string                `json:"delivery_method_additional_info"`
	Note                         string                `json:"note"`
	Code                         *string               `json:"code"`
}

type OrderProductRequest struct {
	ProductId string `json:"product_id"`
	SizeId    string `json:"size_id"`
	Quantity  int    `json:"quantity"`
}

type VerifyOrderRequest struct {
	ConfirmationCode string `json:"confirmation_code"`
}

type UpdateOrderStatusRequest struct {
	Status      Status  `json:"status"`
	TrackingUrl *string `json:"tracking_url"`
}
