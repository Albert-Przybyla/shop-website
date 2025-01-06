package model

import "time"

type ReturnType string

const (
	Refund   ReturnType = "refund"
	Exchange ReturnType = "exchange"
)

type ReturnStatus string

const (
	UnverifiedReturn ReturnStatus = "unverified"
	VerifiedReturn   ReturnStatus = "verified"
	ConfirmedReturn  ReturnStatus = "confirmed"
	CompletedReturn  ReturnStatus = "completed"
	CancelledReturn  ReturnStatus = "cancelled"
)

type OrderReturn struct {
	Id        string       `gorm:"primaryKey;type:uuid;default:gen_random_uuid()" json:"id"`
	OrderId   string       `gorm:"type:uuid;not null" json:"order_id"`
	Type      ReturnType   `gorm:"not null" json:"type"`
	Status    ReturnStatus `gorm:"not null" json:"status"`
	Reason    string       `gorm:"not null" json:"reason"`
	Order     Order        `gorm:"foreignKey:OrderId" json:"order"`
	CreatedAt time.Time    `gorm:"autoCreateTime" json:"created_at"`
	UpdatedAt time.Time    `gorm:"autoUpdateTime" json:"updated_at"`
}

type CreateReturnRequest struct {
	OrderId string `json:"order_id"`
	Type    string `json:"type"`
	Reason  string `json:"reason"`
}
