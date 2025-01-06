package api

import (
	"net/http"
	"server/internal/shared/model"

	"github.com/gin-gonic/gin"
)

func (api *APIServer) CreateSize(c *gin.Context) {
	var req model.SizeRequest

	if err := c.BindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	res, err := api.db.CreateSize(&req)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, res)
}

func (api *APIServer) GetSizes(c *gin.Context) {
	pageSizeInt, pageNumberInt, err := getPaginationParams(c)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid page_size or page_number"})
		return
	}

	items, err := api.db.GetSizes(pageSizeInt, pageNumberInt)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, items)
}

func (api *APIServer) GetSizeById(c *gin.Context) {
	id := c.Param("id")
	size, err := api.db.GetSizeById(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, size)
}

func (api *APIServer) UpdateSize(c *gin.Context) {
	id := c.Param("id")
	var req model.SizeRequest
	if err := c.BindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	err := api.db.UpdateSize(id, &req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Size updated successfully"})
}
