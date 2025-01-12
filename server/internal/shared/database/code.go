package database

import (
	"server/internal/shared/model"

	"gorm.io/gorm"
)

func (p *Postgres) CreateCode(req *model.CodeRequest) (*model.CreateElementResponse, error) {
	code := model.Code{
		Code:        req.Code,
		Value:       req.Value,
		Uses:        0,
		MaxUses:     req.MaxUses,
		IsActive:    true,
		Description: req.Description,
		Expiration:  req.Expiration,
		ShowOnPage:  false,
	}

	res := p.db.Create(&code)

	if res.Error != nil {
		return nil, res.Error
	}

	return &model.CreateElementResponse{
		Id: code.Code,
	}, nil
}

func (p *Postgres) IsCodeExists(code string) (bool, error) {
	var codeExists model.Code
	res := p.db.Where("code = ?", code).First(&codeExists)
	if res.Error != nil {
		if res.Error == gorm.ErrRecordNotFound {
			return false, nil
		}
		return false, res.Error
	}
	return true, nil
}

func (p *Postgres) GetCodeByCode(code_req string) (*model.Code, error) {
	var code model.Code
	res := p.db.Where("code = ?", code_req).First(&code)
	if res.Error != nil {
		return nil, res.Error
	}
	return &code, nil
}

func (p *Postgres) ShowCodeOnPage(code string) error {
	var codeExists model.Code
	exists_res := p.db.Where("show_on_page = true").First(&codeExists)
	if exists_res.Error == nil {
		return ErrShowOnPageCodeExists
	}

	res := p.db.Model(&model.Code{}).Where("code = ?", code).Update("show_on_page", true)
	if res.Error != nil {
		return res.Error
	}
	return nil
}

func (p *Postgres) ToggleActiveCode(code string) error {
	res := p.db.Model(&model.Code{}).
		Where("code = ?", code).
		Update("is_active", gorm.Expr("NOT is_active"))
	if res.Error != nil {
		return res.Error
	}
	return nil
}

func (p *Postgres) GetCodes(pageSize, pageNumber int) (model.PagedListResponse[model.Code], error) {

	var codes []model.Code
	res := p.db.Limit(pageSize).Offset((pageNumber - 1) * pageSize).Find(&codes)
	if res.Error != nil {
		return model.PagedListResponse[model.Code]{}, res.Error
	}

	var totalItems int64
	p.db.Model(&model.Code{}).Count(&totalItems)
	totalPages := int((totalItems + int64(pageSize) - 1) / int64(pageSize))

	response := model.PagedListResponse[model.Code]{
		Items:       codes,
		TotalItems:  int(totalItems),
		TotalPages:  totalPages,
		CurrentPage: pageNumber,
	}

	return response, nil

}
