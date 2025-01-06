package database

import (
	"server/internal/shared/model"

	"gorm.io/gorm"
)

func (p *Postgres) CreateDeliveryMethod(req *model.DeliveryMethodRquest) (*model.CreateElementResponse, error) {
	delivery := model.DeliveryMethod{
		Name:                req.Name,
		Price:               req.Price,
		AdditionalInfoLabel: req.AdditionalInfoLabel,
	}
	res := p.db.Create(&delivery)

	if res.Error != nil {
		return nil, res.Error
	}

	return &model.CreateElementResponse{
		Id: delivery.Id,
	}, nil
}

func (p *Postgres) GetDeliveryMethodById(id string) (*model.DeliveryMethod, error) {
	var delivery model.DeliveryMethod
	res := p.db.Where("id = ?", id).First(&delivery)
	if res.Error != nil {
		if res.Error == gorm.ErrRecordNotFound {
			return nil, res.Error
		}
		return nil, res.Error
	}
	return &delivery, nil
}

func (p *Postgres) UpdateDeliveryMethod(id string, req *model.DeliveryMethodRquest) error {
	res := p.db.Model(&model.DeliveryMethod{}).Where("id = ? ", id).Updates(req)
	if res.Error != nil {
		return res.Error
	}
	return nil
}

func (p *Postgres) GetDeliveryMethods(pageSize, pageNumber int) (model.PagedListResponse[model.DeliveryMethod], error) {
	var deliveryMethods []model.DeliveryMethod
	res := p.db.Limit(pageSize).Offset((pageNumber - 1) * pageSize).Find(&deliveryMethods)
	if res.Error != nil {
		return model.PagedListResponse[model.DeliveryMethod]{}, res.Error
	}

	var totalItems int64
	p.db.Model(&model.DeliveryMethod{}).Count(&totalItems)
	totalPages := int((totalItems + int64(pageSize) - 1) / int64(pageSize))

	response := model.PagedListResponse[model.DeliveryMethod]{
		Items:       deliveryMethods,
		TotalItems:  int(totalItems),
		TotalPages:  totalPages,
		CurrentPage: pageNumber,
	}

	return response, nil
}
