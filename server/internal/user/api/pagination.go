package api

import (
	"strconv"

	"github.com/gin-gonic/gin"
)

func getPaginationParams(c *gin.Context) (int, int, error) {
	pageSize := c.Query("page_size")
	pageNumber := c.Query("page_number")

	if pageSize == "" {
		pageSize = "10"
	}

	if pageNumber == "" {
		pageNumber = "1"
	}

	pageSizeInt, err := strconv.Atoi(pageSize)
	if err != nil {
		return 0, 0, err
	}

	pageNumberInt, err := strconv.Atoi(pageNumber)
	if err != nil {
		return 0, 0, err
	}

	return pageSizeInt, pageNumberInt, nil
}
