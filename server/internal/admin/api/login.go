package api

import (
	"net/http"
	"server/internal/shared/model"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

func (a *APIServer) Login(c *gin.Context) {
	var req model.LoginRequest

	if err := c.BindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, model.ErrorResponse{Success: false, Error: err.Error()})
		return
	}

	admin, err := a.db.GetAdminByEmail(req.Email)
	if err != nil {
		c.JSON(http.StatusUnauthorized, model.ErrorResponse{Success: false, Error: "Invalid email or password"})
		return
	}

	err = bcrypt.CompareHashAndPassword([]byte(admin.Password), []byte(req.Password))
	if err != nil {
		c.JSON(http.StatusUnauthorized, model.ErrorResponse{Success: false, Error: "Invalid email or password"})
		return
	}

	token, err := a.generateToken(admin)
	if err != nil {
		c.JSON(http.StatusInternalServerError, model.ErrorResponse{Success: false, Error: "Invalid email or password"})
		return
	}

	c.JSON(http.StatusOK, model.LoginResponse{Success: true, Token: token})
}
