package database

import (
	model "server/internal/shared/model"

	"gorm.io/gorm"
)

func (p *Postgres) CreateProduct(req *model.ProductRequest) (*model.CreateElementResponse, error) {
	product := model.Product{
		Name:                 req.Name,
		Description:          req.Description,
		Material:             req.Material,
		AditionalDescription: req.AditionalDescription,
		Price:                int(req.Price * 100),
		Discount:             0,
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
	res := p.db.Model(&model.Product{}).Where("id = ? ", id).Updates(model.Product{
		Name:                 req.Name,
		Description:          req.Description,
		AditionalDescription: req.AditionalDescription,
		Material:             req.Material,
		Price:                int(req.Price * 100),
	})
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

func (p *Postgres) GetProducts(pageSize, pageNumber int) (model.PagedListResponse[model.Product], error) {

	var products []model.Product
	res := p.db.Limit(pageSize).Offset((pageNumber - 1) * pageSize).Find(&products)
	if res.Error != nil {
		return model.PagedListResponse[model.Product]{}, res.Error
	}

	var totalItems int64
	p.db.Model(&model.Product{}).Count(&totalItems)
	totalPages := int((totalItems + int64(pageSize) - 1) / int64(pageSize))

	response := model.PagedListResponse[model.Product]{
		Items:       products,
		TotalItems:  int(totalItems),
		TotalPages:  totalPages,
		CurrentPage: pageNumber,
	}

	return response, nil
}

func (p *Postgres) GetProductsForUser(pageSize, pageNumber int) (model.PagedListResponse[model.ProductUserResponse], error) {

	var products []model.Product
	res := p.db.Preload("Photos").Limit(pageSize).Offset((pageNumber - 1) * pageSize).Find(&products)
	if res.Error != nil {
		return model.PagedListResponse[model.ProductUserResponse]{}, res.Error
	}

	var totalItems int64
	p.db.Model(&model.Product{}).Count(&totalItems)
	totalPages := int((totalItems + int64(pageSize) - 1) / int64(pageSize))

	var productResponses []model.ProductUserResponse
	for _, product := range products {
		productResponses = append(productResponses, model.ProductUserResponse{
			ID:                   product.Id,
			Name:                 product.Name,
			Description:          product.Description,
			AditionalDescription: product.AditionalDescription,
			Material:             product.Material,
			Price:                product.Price,
			Discount:             product.Discount,
			Photos:               product.Photos,
			Sizes:                product.Sizes,
		})
	}

	response := model.PagedListResponse[model.ProductUserResponse]{
		Items:       productResponses,
		TotalItems:  int(totalItems),
		TotalPages:  totalPages,
		CurrentPage: pageNumber,
	}

	return response, nil
}

func (p *Postgres) GetProductById(id string) (*model.Product, error) {
	var product model.Product
	res := p.db.Preload("Photos").Preload("Sizes").Where("id = ?", id).First(&product)
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

func (p *Postgres) AddSizeToProduct(productId, sizeId string) error {
	var product model.Product
	res := p.db.Preload("Photos").Preload("Sizes").Where("id = ?", productId).First(&product)
	if res.Error != nil {
		if res.Error == gorm.ErrRecordNotFound {
			return res.Error
		}
		return res.Error
	}

	product.Sizes = append(product.Sizes, model.Size{
		Id: sizeId,
	})
	res = p.db.Save(&product)
	if res.Error != nil {
		return res.Error
	}

	return nil
}
