package api

import (
	"net/http"
	"server/internal/shared/model"

	"github.com/gin-gonic/gin"
)

func (a *APIServer) CreateOrder(c *gin.Context) {
	var req model.CreateOrderRequest

	if err := c.BindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	res, err := a.db.CreateOrder(&req)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, res)
}

func (a *APIServer) VerifyOrder(c *gin.Context) {
	id := c.Param("id")

	var req model.VerifyOrderRequest

	if err := c.BindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	code, err := a.db.GetOrderConfirmationCode(id)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if code != req.ConfirmationCode {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid confirmation code"})
		return
	}

	err = a.db.ChangeOrderStatus(id, "verified")

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Order verified successfully"})
}
