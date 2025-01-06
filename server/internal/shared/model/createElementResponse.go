package model

type CreateElementResponse struct {
	Id string `json:"id"`
}

type CreateOrderResponse struct {
	Id   string `json:"id"`
	Code string `json:"code"`
}
