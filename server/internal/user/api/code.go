package api

import (
	"net/http"
	"server/internal/shared/model"
	"time"

	"github.com/gin-gonic/gin"
)

func (a *APIServer) CheckCode(c *gin.Context) {
	req_code := c.Param("code")

	err := a.ValidateCode(req_code)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error(), "success": false})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Podany kod jest poprawny.", "success": true})
}

func (a *APIServer) GetCodeByCode(c *gin.Context) {
	code := c.Param("code")
	res, err := a.db.GetCodeByCode(code)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, model.UserCodeResponse{Code: res.Code, Value: res.Value})
}

func (a *APIServer) ValidateCode(code_req string) error {
	exists, err := a.db.IsCodeExists(code_req)
	if err != nil {
		return err
	}
	if !exists {
		return ErrCodeNotFound
	}

	code, err := a.db.GetCodeByCode(code_req)
	if err != nil {
		return err
	}

	if !code.IsActive {
		return ErrCodeNotFound
	}

	if code.MaxUses != nil && code.Uses >= *code.MaxUses {
		return ErrCodeUsed
	}

	if code.Expiration != nil && code.Expiration.Before(time.Now()) {
		return ErrCodeExpired
	}
	return nil
}
