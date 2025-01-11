package database

import (
	"fmt"
	"math/rand"
	model "server/internal/shared/model"
	"time"

	"gorm.io/gorm"
)

func (p *Postgres) CreateOrder(req *model.CreateOrderRequest) (*model.CreateOrderResponse, error) {

	if len(req.Products) == 0 {
		return nil, fmt.Errorf("zamówienie musi zawierać przynajmniej jeden produkt")
	}

	totalPrice := 0.0
	products := []model.OrderProduct{}
	for _, requestProduct := range req.Products {
		var product model.Product
		if err := p.db.Preload("Sizes").First(&product, "id = ?", requestProduct.ProductId).Error; err != nil {
			return nil, fmt.Errorf("błąd przy pobieraniu produktu o ID %d: %w", requestProduct.ProductId, err)
		}

		sizeFound := false
		for _, productSize := range product.Sizes {
			if productSize.Id == requestProduct.SizeId {
				sizeFound = true
				break
			}
		}

		if !sizeFound {
			return nil, fmt.Errorf("rozmiar %d nie został znaleziony dla produktu o ID %d", requestProduct.SizeId, requestProduct.ProductId)
		}

		products = append(products, model.OrderProduct{
			ProductId: requestProduct.ProductId,
			Quantity:  requestProduct.Quantity,
			SizeId:    requestProduct.SizeId,
		})

		totalPrice += (product.Price - (product.Price * float64(product.Discount) / 100)) * float64(requestProduct.Quantity)
	}

	var delivery model.DeliveryMethod
	deliveryRes := p.db.Where("id = ?", req.DeliveryMethodId).First(&delivery)
	if deliveryRes.Error != nil {
		if deliveryRes.Error == gorm.ErrRecordNotFound {
			return nil, fmt.Errorf("metoda dostawy o ID %d nie została znaleziona", req.DeliveryMethodId)
		}
		return nil, fmt.Errorf("błąd przy pobieraniu metody dostawy: %w", deliveryRes.Error)
	}

	order := model.Order{
		FirstName:                    req.FirstName,
		LastName:                     req.LastName,
		Email:                        req.Email,
		Phone:                        req.Phone,
		Address:                      req.Address,
		PostalCode:                   req.PostalCode,
		City:                         req.City,
		Country:                      req.Country,
		ConfirmationCode:             generateConfirmationCode(),
		Status:                       "unverified",
		TotalPrice:                   totalPrice,
		DeliveryPrice:                delivery.Price,
		DeliveryMethodId:             req.DeliveryMethodId,
		DeliveryMethodAdditionalInfo: req.DeliveryMethodAdditionalInfo,
		Note:                         req.Note,
		Products:                     products,
	}

	res := p.db.Create(&order)
	if res.Error != nil {
		return nil, fmt.Errorf("błąd przy tworzeniu zamówienia: %w", res.Error)
	}

	return &model.CreateOrderResponse{Id: order.Id, Code: order.ConfirmationCode}, nil
}

func (p *Postgres) ChangeOrderStatus(id string, status model.Status) error {
	res := p.db.Model(&model.Order{}).Where("id = ? ", id).Update("status", status)
	if res.Error != nil {
		return res.Error
	}
	return nil
}

func (p *Postgres) GetOrderConfirmationCode(id string) (string, error) {
	var order model.Order
	res := p.db.Model(&model.Order{}).Where("id = ? ", id).First(&order)
	if res.Error != nil {
		if res.Error == gorm.ErrRecordNotFound {
			return "", res.Error
		}
		return "", res.Error
	}
	return order.ConfirmationCode, nil
}

func (p *Postgres) GetOrderStatus(id string) (model.Status, error) {
	var order model.Order
	res := p.db.Model(&model.Order{}).Where("id = ? ", id).First(&order)
	if res.Error != nil {
		if res.Error == gorm.ErrRecordNotFound {
			return "", res.Error
		}
		return "", res.Error
	}
	return order.Status, nil
}

func (p *Postgres) GetOrders(pageNumber, pageSize int) (model.PagedListResponse[model.Order], error) {
	var orders []model.Order
	res := p.db.Limit(pageSize).Offset((pageNumber - 1) * pageSize).Find(&orders)
	if res.Error != nil {
		return model.PagedListResponse[model.Order]{}, res.Error
	}
	var totalItems int64
	p.db.Model(&model.Order{}).Count(&totalItems)
	totalPages := int((totalItems + int64(pageSize) - 1) / int64(pageSize))

	response := model.PagedListResponse[model.Order]{
		Items:       orders,
		TotalItems:  int(totalItems),
		TotalPages:  totalPages,
		CurrentPage: pageNumber,
	}

	return response, nil
}

func (p *Postgres) GetOrderById(id string) (*model.Order, error) {
	var order model.Order
	res := p.db.Preload("DeliveryMethod").Preload("Products").Preload("Products.Product").Preload("Products.Size").Where("id = ?", id).First(&order)
	if res.Error != nil {
		if res.Error == gorm.ErrRecordNotFound {
			return nil, res.Error
		}
		return nil, res.Error
	}
	return &order, nil
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

func (p *Postgres) UpdateOrderStatus(id string, status model.Status) error {
	res := p.db.Model(&model.Order{}).Where("id = ? ", id).Update("status", status)
	if res.Error != nil {
		return res.Error
	}
	return nil
}
