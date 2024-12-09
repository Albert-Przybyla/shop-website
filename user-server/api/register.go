package api

import (
	"net/http"
	model "server/model/user"

	"github.com/gin-gonic/gin"
)

func (a *APIServer) Register(c *gin.Context) {
	var req model.CreateUserRequest

	if err := c.BindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	res, err := a.db.CreateUser(req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, res)
}
