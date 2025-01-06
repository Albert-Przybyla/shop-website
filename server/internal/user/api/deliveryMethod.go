package api

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

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
