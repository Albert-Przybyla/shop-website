package model

import "time"

type DeliveryMethod struct {
	Id                  string    `gorm:"primaryKey;type:uuid;default:gen_random_uuid()" json:"id"`
	Name                string    `gorm:"not null;unique" json:"name"`
	Price               int       `gorm:"not null" json:"price"`
	AdditionalInfoLabel string    `gorm:"nullable" json:"additional_info_label"`
	CreatedAt           time.Time `gorm:"autoCreateTime" json:"created_at"`
	UpdatedAt           time.Time `gorm:"autoUpdateTime" json:"updated_at"`
}

type DeliveryMethodRquest struct {
	Name                string `json:"name"`
	Price               int    `json:"price"`
	AdditionalInfoLabel string `json:"aditional_info_label"`
}
