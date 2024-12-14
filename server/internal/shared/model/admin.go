package model

import "time"

type Admin struct {
	Id           string    `gorm:"primaryKey;type:uuid;default:gen_random_uuid()" json:"id"`
	FirstName    string    `gorm:"not null" json:"first_name"`
	LastName     string    `gorm:"not null" json:"last_name"`
	Email        string    `gorm:"not null" json:"email"`
	Password     string    `gorm:"not null" json:"password"`
	RefreshToken string    `gorm:"size:255" json:"-"`
	CreatedAt    time.Time `gorm:"autoCreateTime" json:"created_at"`
	UpdatedAt    time.Time `gorm:"autoUpdateTime" json:"updated_at"`
}

type CreateAdmin struct {
	Email     string `json:"email"`
	Password  string `json:"password"`
	FirstName string `json:"first_name"`
	LastName  string ` json:"last_name"`
}
