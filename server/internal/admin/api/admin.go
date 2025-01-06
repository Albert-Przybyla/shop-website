package api

import (
	"net/http"
	"server/internal/shared/model"

	"github.com/gin-gonic/gin"
)

func (a *APIServer) CreateAdmin(c *gin.Context) {
	var req model.CreateAdmin

	if err := c.BindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	res, err := a.db.CreateAdmin(&req)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, res)
}
