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

func (a *APIServer) createProduct(c *gin.Context) {

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
	for i := range product.Photos {
		product.Photos[i].Url = "http://localhost:9000/images/" + product.Photos[i].Url
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

	fileData, err := ioutil.ReadAll(c.Request.Body)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to read request body"})
		return
	}
	defer c.Request.Body.Close()

	contentType := c.GetHeader("Content-Type")
	if contentType == "" {
		contentType = "application/octet-stream"
	}

	fileName := c.GetHeader("File-Name")
	if fileName == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "File-Name header is required"})
		return
	}

	ext := filepath.Ext(fileName)
	if ext == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid file name or missing extension"})
		return
	}

	objectName := fmt.Sprintf("%s%s", uuid.NewString(), ext)

	bucketName := "images"
	_, err = a.minio.UploadFile(bucketName, objectName, fileData, contentType)

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
		Url:       objectName,
		Order:     orderInt,
	})

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to add photo"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Photo added successfully"})
}
