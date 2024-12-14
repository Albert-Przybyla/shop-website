package database

import (
	"math/rand"
	model "server/internal/shared/model"
	"time"
)

func (p *Postgres) CreateOrder(req *model.CreateOrderRequest) (*model.CreateElementResponse, error) {

	products := []model.Product{}
	totalPrice := 0.0
	for _, productID := range req.Products {
		var product model.Product
		if err := p.db.First(&product, "id = ?", productID).Error; err != nil {
			return nil, err
		}
		products = append(products, product)
		totalPrice += (product.Price - (product.Price * float64(product.Discount) / 100))
	}
	order := model.Order{
		FirstName:        req.FirstName,
		LastName:         req.LastName,
		Email:            req.Email,
		Phone:            req.Phone,
		Address:          req.Address,
		PostalCode:       req.PostalCode,
		City:             req.City,
		Country:          req.Country,
		Products:         products,
		ConfirmationCode: generateConfirmationCode(),
		Status:           "unverified",
		TotalPrice:       totalPrice,
	}
	res := p.db.Create(&order)

	if res.Error != nil {
		return nil, res.Error
	}

	return &model.CreateElementResponse{
		Id: order.Id,
	}, nil
}

func generateConfirmationCode() string {
	const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
	seededRand := rand.New(rand.NewSource(time.Now().UnixNano()))
	code := make([]byte, 6)
	for i := range code {
		code[i] = charset[seededRand.Intn(len(charset))]
	}
	return string(code)
}
