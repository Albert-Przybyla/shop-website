package api

func (a *APIServer) Routes() {
	a.engine.POST("/login", a.Login)
	a.engine.POST("/admin", a.validateToken(), a.CreateAdmin)
	a.engine.GET("/admin", a.validateToken(), a.GetAdmins)
	a.engine.GET("/admin/:id", a.validateToken(), a.GetAdminById)

	a.engine.POST("/product", a.validateToken(), a.CreateProduct)
	a.engine.GET("/product", a.validateToken(), a.GetProducts)
	a.engine.GET("/product/:id", a.validateToken(), a.GetProductById)
	a.engine.PUT("/product/:id", a.validateToken(), a.UpdateProduct)
	a.engine.PATCH("/product/:id/discount", a.validateToken(), a.SetDiscount)
	a.engine.PATCH("/product/:id/size/:size_id", a.validateToken(), a.AddSizeToProduct)
	a.engine.POST("/product/:id/photo/:order", a.validateToken(), a.AddPhotoToProduct)

	a.engine.GET("/order", a.validateToken(), a.GetOrders)
	a.engine.GET("/order/:id", a.validateToken(), a.GetOrderById)
	a.engine.PATCH("/order/:id/status", a.validateToken(), a.UpdateOrderStatus)

	a.engine.POST("/size", a.validateToken(), a.CreateSize)
	a.engine.GET("/size", a.validateToken(), a.GetSizes)
	a.engine.GET("/size/:id", a.validateToken(), a.GetSizeById)
	a.engine.PUT("/size/:id", a.validateToken(), a.UpdateSize)

	a.engine.POST("/delivery-method", a.validateToken(), a.CreateDeliveryMethod)
	a.engine.GET("/delivery-method", a.validateToken(), a.GetDeliveryMethods)
	a.engine.GET("/delivery-method/:id", a.validateToken(), a.GetDeliveryMethodById)
	a.engine.PUT("/delivery-method/:id", a.validateToken(), a.UpdateDeliveryMethod)
}
