package api

import (
	"net/http"
	"server/internal/shared/model"

	"github.com/gin-gonic/gin"
)

func (a *APIServer) CreateCode(c *gin.Context) {

	var req model.CodeRequest

	if err := c.BindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	res, err := a.db.CreateCode(&req)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, res)
}

func (a *APIServer) GetCodes(c *gin.Context) {
	pageSizeInt, pageNumberInt, err := getPaginationParams(c)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid page_size or page_number"})
		return
	}
	items, err := a.db.GetCodes(pageSizeInt, pageNumberInt)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, items)
}

func (a *APIServer) IsCodeExists(c *gin.Context) {
	code := c.Param("code")
	exists, err := a.db.IsCodeExists(code)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"exists": exists})
}

func (a *APIServer) ToggleActiveCode(c *gin.Context) {
	code := c.Param("code")
	err := a.db.ToggleActiveCode(code)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Code toggled successfully"})
}
