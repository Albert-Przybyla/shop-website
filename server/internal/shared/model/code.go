package model

import "time"

type Code struct {
	Code        string     `gorm:"primaryKey;unique;type:varchar" json:"code"`
	Value       int        `gorm:"not null" json:"value"`
	MaxUses     *int       `gorm:"nullable" json:"max_uses"`
	Uses        int        `gorm:"not null" json:"uses"`
	ShowOnPage  bool       `gorm:"not null" json:"show_on_page"`
	Description *string    `gorm:"nullable" json:"description"`
	IsActive    bool       `gorm:"not null" json:"is_active"`
	Expiration  *time.Time `gorm:"nullable" json:"expiration"`
	UpdatedAt   time.Time  `gorm:"autoUpdateTime" json:"updated_at"`
	CreatedAt   time.Time  `gorm:"autoCreateTime" json:"created_at"`
}

type CodeRequest struct {
	Code        string     `json:"code"`
	Value       int        `json:"value"`
	MaxUses     *int       `json:"max_uses"`
	Description *string    `json:"description"`
	Expiration  *time.Time `json:"expiration"`
}
