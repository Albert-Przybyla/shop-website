package api

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func (a *APIServer) GetProductById(c *gin.Context) {
	c.Header("Cache-Control", "no-store")
	id := c.Param("id")
	product, err := a.db.GetProductById(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, product)
}

func (a *APIServer) GetProducts(c *gin.Context) {
	c.Header("Cache-Control", "no-store")
	pageSizeInt, pageNumberInt, err := getPaginationParams(c)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid page_size or page_number"})
		return
	}

	items, err := a.db.GetProductsForUser(pageSizeInt, pageNumberInt)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, items)
}
