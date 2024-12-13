package api

import (
	"server/config"
	"server/database"
	minio_conf "server/minio"

	"github.com/gin-gonic/gin"
)

type APIServer struct {
	port   string
	db     *database.Postgres
	minio  *minio_conf.MinioStorage
	engine *gin.Engine
}

func New() *APIServer {
	return &APIServer{
		db:     database.New(),
		engine: gin.New(),
		minio:  minio_conf.New(),
		port:   config.AppConfig.Port,
	}
}

func (a *APIServer) Start() {
	a.Routes()
	a.engine.Run(":" + a.port)
}
