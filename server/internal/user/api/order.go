package api

import (
	"net/http"
	"server/internal/shared/mailer"
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

	emailData := mailer.VerificationEmail{
		Name: req.FirstName + " " + req.LastName,
		Code: res.Code,
	}
	mail_err := a.mailer.SendVerificationCode(req.Email, emailData)
	if mail_err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to send email"})
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

	mail_err := a.mailer.SendNewOrderStatusEmail(order.Email, "verified", emailData)
	if mail_err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to send email"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Order verified successfully"})
}

func (a *APIServer) CheckOrderStatus(c *gin.Context) {
	id := c.Param("id")

	status, err := a.db.GetOrderStatus(id)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": status})
}
