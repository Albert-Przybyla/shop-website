package api

func (a *APIServer) Routes() {
	a.engine.POST("/login", a.Login)
	a.engine.POST("/admin", a.validateToken(), a.createAdmin)

	a.engine.POST("/product", a.validateToken(), a.createProduct)
	a.engine.GET("/product", a.validateToken(), a.GetProducts)
	a.engine.GET("/product/:id", a.validateToken(), a.GetProductById)
	a.engine.PUT("/product/:id", a.validateToken(), a.UpdateProduct)
	a.engine.PATCH("/product/:id", a.validateToken(), a.SetDiscount)
}
