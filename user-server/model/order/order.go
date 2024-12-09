package model

import "time"

type Order struct {
	Id         string    `gorm:"primaryKey;type:uuid;default:gen_random_uuid()" json:"id"`
	UserId     string    `json:"user_id"`
	AddressId  string    `json:"address_id"`
	ProductIds []string  `json:"products_ids"`
	CreatedAt  time.Time `gorm:"autoCreateTime" json:"created_at"`
	UpdatedAt  time.Time `gorm:"autoUpdateTime" json:"updated_at"`
}
