package model

import "time"

type Address struct {
	Id        string    `gorm:"primaryKey;type:uuid;default:gen_random_uuid()" json:"id"`
	UserId    string    `json:"user_id"`
	Address   string    `json:"address"`
	Street    string    `json:"street"`
	City      string    `json:"city"`
	Province  string    `json:"province"`
	Postal    string    `json:"postal"`
	Country   string    `json:"country"`
	CreatedAt time.Time `gorm:"autoCreateTime" json:"created_at"`
	UpdatedAt time.Time `gorm:"autoUpdateTime" json:"updated_at"`
}
