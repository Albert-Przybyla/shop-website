package api

func (a *APIServer) Routes() {
	a.engine.GET("/product", a.GetProducts)
	a.engine.GET("/product/:id", a.GetProductById)

	a.engine.POST("/order", a.CreateOrder)
	a.engine.PATCH("/order/:id/verify", a.VerifyOrder)
	a.engine.GET("/order/:id/status", a.CheckOrderStatus)

	a.engine.GET("/delivery-method", a.GetDeliveryMethods)

	a.engine.GET("/code/:code/verify", a.CheckCode)
	a.engine.GET("/code/:code", a.GetCodeByCode)
}
