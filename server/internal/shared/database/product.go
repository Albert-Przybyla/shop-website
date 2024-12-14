package database

import model "server/internal/shared/model"

func (p *Postgres) CreateProduct(req *model.CreateProductRequest) error {
	product := model.Product{
		Name:        req.Name,
		Description: req.Description,
		Price:       req.Price,
		Discount:    0,
	}
	res := p.db.Create(&product)
	return res.Error
}
