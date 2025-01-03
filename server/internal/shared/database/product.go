package database

import (
	model "server/internal/shared/model"

	"gorm.io/gorm"
)

func (p *Postgres) CreateProduct(req *model.ProductRequest) (*model.CreateElementResponse, error) {
	product := model.Product{
		Name:        req.Name,
		Description: req.Description,
		Price:       req.Price,
		Discount:    0,
	}
	res := p.db.Create(&product)

	if res.Error != nil {
		return nil, res.Error
	}

	return &model.CreateElementResponse{
		Id: product.Id,
	}, nil
}

func (p *Postgres) UpdateProduct(id string, req *model.ProductRequest) error {
	res := p.db.Model(&model.Product{}).Where("id = ? ", id).Updates(req)
	if res.Error != nil {
		return res.Error
	}
	return nil
}

func (p *Postgres) SetDiscount(id string, discount int) error {
	res := p.db.Model(&model.Product{}).Where("id = ? ", id).Update("discount", discount)
	if res.Error != nil {
		return res.Error
	}
	return nil
}

func (p *Postgres) GetProducts(pageSize, pageNumber int) (model.PagedListResponse[model.ProductAdminResponse], error) {

	var products []model.Product
	res := p.db.Limit(pageSize).Offset((pageNumber - 1) * pageSize).Find(&products)
	if res.Error != nil {
		return model.PagedListResponse[model.ProductAdminResponse]{}, res.Error
	}

	var totalItems int64
	p.db.Model(&model.Product{}).Count(&totalItems)
	totalPages := int((totalItems + int64(pageSize) - 1) / int64(pageSize))

	var productResponses []model.ProductAdminResponse
	for _, product := range products {
		productResponses = append(productResponses, model.ProductAdminResponse{
			ID:          product.Id,
			Name:        product.Name,
			Description: product.Description,
		})
	}

	response := model.PagedListResponse[model.ProductAdminResponse]{
		Items:       productResponses,
		TotalItems:  int(totalItems),
		TotalPages:  totalPages,
		CurrentPage: pageNumber,
	}

	return response, nil
}

func (p *Postgres) GetProductById(id string) (*model.Product, error) {
	var product model.Product
	res := p.db.Preload("Photos").Where("id = ?", id).First(&product)
	if res.Error != nil {
		if res.Error == gorm.ErrRecordNotFound {
			return nil, res.Error
		}
		return nil, res.Error
	}
	return &product, nil
}

func (p *Postgres) AddPhotoToProduct(photo *model.ProductPhoto) error {
	res := p.db.Create(photo)
	if res.Error != nil {
		return res.Error
	}
	return nil
}
