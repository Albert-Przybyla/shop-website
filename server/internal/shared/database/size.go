package database

import (
	"server/internal/shared/model"

	"gorm.io/gorm"
)

func (p *Postgres) CreateSize(req *model.SizeRequest) (*model.CreateElementResponse, error) {
	size := model.Size{
		Label: req.Label,
	}
	res := p.db.Create(&size)

	if res.Error != nil {
		return nil, res.Error
	}

	return &model.CreateElementResponse{
		Id: size.Id,
	}, nil
}

func (p *Postgres) GetSizeById(id string) (*model.Size, error) {
	var size model.Size
	res := p.db.Where("id = ?", id).First(&size)
	if res.Error != nil {
		if res.Error == gorm.ErrRecordNotFound {
			return nil, res.Error
		}
		return nil, res.Error
	}
	return &size, nil
}

func (p *Postgres) UpdateSize(id string, req *model.SizeRequest) error {
	res := p.db.Model(&model.Size{}).Where("id = ? ", id).Updates(req)
	if res.Error != nil {
		return res.Error
	}
	return nil
}

func (p *Postgres) GetSizes(pageSize, pageNumber int) (model.PagedListResponse[model.Size], error) {
	var sizes []model.Size
	res := p.db.Limit(pageSize).Offset((pageNumber - 1) * pageSize).Find(&sizes)
	if res.Error != nil {
		return model.PagedListResponse[model.Size]{}, res.Error
	}

	var totalItems int64
	p.db.Model(&model.Size{}).Count(&totalItems)
	totalPages := int((totalItems + int64(pageSize) - 1) / int64(pageSize))

	response := model.PagedListResponse[model.Size]{
		Items:       sizes,
		TotalItems:  int(totalItems),
		TotalPages:  totalPages,
		CurrentPage: pageNumber,
	}

	return response, nil
}
