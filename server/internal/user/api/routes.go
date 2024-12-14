package api

func (a *APIServer) Routes() {
	a.engine.GET("/product", a.GetProducts)
	a.engine.GET("/product/:id", a.GetProductById)

	a.engine.POST("/order", a.CreateOrder)
}
