package api

import (
	"net/http"
	"server/internal/shared/config"
	"server/internal/shared/database"
	"server/internal/shared/mailer"

	// minio_conf "server/internal/shared/minio"

	"github.com/gin-gonic/gin"
)

type APIServer struct {
	port string
	db   *database.Postgres
	// minio  *minio_conf.MinioStorage
	engine *gin.Engine
	mailer *mailer.Mailer
}

func New() *APIServer {
	return &APIServer{
		db:     database.New(),
		engine: gin.New(),
		// minio:  minio_conf.New(),
		port:   config.AppConfig.UserPort,
		mailer: mailer.New(),
	}
}

func (a *APIServer) Start() {
	a.engine.Use(CORSMiddleware())
	a.Routes()
	a.engine.Run(":" + a.port)
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST,PATCH, PUT, DELETE, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Origin, Content-Type, Authorization")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(http.StatusOK)
			return
		}

		c.Next()
	}
}
