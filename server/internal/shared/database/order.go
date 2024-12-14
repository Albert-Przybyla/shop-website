package database

import (
	model "server/internal/shared/model"
)

func (p *Postgres) CreateOrder(order *model.Order) error {
	return p.db.Create(order).Error
}
