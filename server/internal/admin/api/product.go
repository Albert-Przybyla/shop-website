package api

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"path/filepath"
	"server/internal/shared/model"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

func (a *APIServer) CreateProduct(c *gin.Context) {

	var req model.ProductRequest

	if err := c.BindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	res, err := a.db.CreateProduct(&req)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, res)
}

func (a *APIServer) UpdateProduct(c *gin.Context) {
	id := c.Param("id")
	var req model.ProductRequest
	if err := c.BindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	err := a.db.UpdateProduct(id, &req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Product updated successfully"})
}

func (a *APIServer) SetDiscount(c *gin.Context) {
	id := c.Param("id")
	var req model.ProductSetDiscountRequest
	if err := c.BindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	err := a.db.SetDiscount(id, req.Discount)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Discount set successfully"})
}

func (a *APIServer) GetProductById(c *gin.Context) {
	id := c.Param("id")
	product, err := a.db.GetProductById(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, product)
}

func (a *APIServer) GetProducts(c *gin.Context) {
	pageSizeInt, pageNumberInt, err := getPaginationParams(c)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid page_size or page_number"})
		return
	}

	items, err := a.db.GetProducts(pageSizeInt, pageNumberInt)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, items)
}

func (a *APIServer) AddPhotoToProduct(c *gin.Context) {
	id := c.Param("id")
	order := c.Param("order")

	file, err := c.FormFile("photo")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to retrieve file"})
		return
	}

	fileData, err := file.Open()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to open file"})
		return
	}
	defer fileData.Close()

	buffer, err := ioutil.ReadAll(fileData)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to read file data"})
		return
	}

	ext := filepath.Ext(file.Filename)
	if ext == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid file name or missing extension"})
		return
	}

	objectName := fmt.Sprintf("%s%s", uuid.NewString(), ext)

	bucketName := "images"
	contentType := file.Header.Get("Content-Type")
	if contentType == "" {
		contentType = "application/octet-stream"
	}

	url, err := a.minio.UploadFile(bucketName, objectName, buffer, contentType)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to upload file"})
		return
	}

	orderInt, err := strconv.Atoi(order)
	if err != nil {
		orderInt = 0
	}

	err = a.db.AddPhotoToProduct(&model.ProductPhoto{
		ProductId: id,
		Url:       url,
		Order:     orderInt,
	})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to add photo"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Photo added successfully", "url": url})
}

func (a *APIServer) AddSizeToProduct(c *gin.Context) {
	id := c.Param("id")
	size_id := c.Param("size_id")

	err := a.db.AddSizeToProduct(id, size_id)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Size added successfully"})
}
