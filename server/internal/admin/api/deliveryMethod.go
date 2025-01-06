package api

import (
	"net/http"
	"server/internal/shared/model"

	"github.com/gin-gonic/gin"
)

func (api *APIServer) CreateDeliveryMethod(c *gin.Context) {
	var req model.DeliveryMethodRquest

	if err := c.BindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	res, err := api.db.CreateDeliveryMethod(&req)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, res)
}

func (api *APIServer) GetDeliveryMethods(c *gin.Context) {
	pageSizeInt, pageNumberInt, err := getPaginationParams(c)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid page_size or page_number"})
		return
	}

	items, err := api.db.GetDeliveryMethods(pageSizeInt, pageNumberInt)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, items)
}

func (api *APIServer) GetDeliveryMethodById(c *gin.Context) {
	id := c.Param("id")
	size, err := api.db.GetDeliveryMethodById(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, size)
}

func (api *APIServer) UpdateDeliveryMethod(c *gin.Context) {
	id := c.Param("id")
	var req model.DeliveryMethodRquest
	if err := c.BindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	err := api.db.UpdateDeliveryMethod(id, &req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Delivery method updated successfully"})
}
