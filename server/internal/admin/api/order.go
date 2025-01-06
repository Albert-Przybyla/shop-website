package api

import (
	"net/http"
	"server/internal/shared/mailer"
	"server/internal/shared/model"

	"github.com/gin-gonic/gin"
)

func (a *APIServer) GetOrders(c *gin.Context) {
	pageSizeInt, pageNumberInt, err := getPaginationParams(c)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid page_size or page_number"})
		return
	}
	orders, err := a.db.GetOrders(pageNumberInt, pageSizeInt)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, orders)
}

func (a *APIServer) GetOrderById(c *gin.Context) {
	id := c.Param("id")
	order, err := a.db.GetOrderById(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, order)
}

func (a *APIServer) UpdateOrderStatus(c *gin.Context) {
	id := c.Param("id")
	var req model.UpdateOrderStatusRequest
	if err := c.BindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	err := a.db.UpdateOrderStatus(id, req.Status)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	order, err := a.db.GetOrderById(id)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	emailData := mailer.NewOrderStatusEmail{
		Name:        order.FirstName + " " + order.LastName,
		OrderNumber: id,
		OrderDate:   order.CreatedAt.Format("2006-01-02"),
		TotalAmount: order.TotalPrice,
		Title:       "",
		SubTitle:    "",
		Article1:    "",
		Article2:    "",
		TrackingUrl: nil,
	}

	mail_err := a.mailer.SendNewOrderStatusEmail(order.Email, order.Status, emailData)
	if mail_err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to send email"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Order status updated successfully"})
}
