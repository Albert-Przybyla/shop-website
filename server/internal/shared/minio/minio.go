package minio

import (
	"bytes"
	"context"
	"log"
	"server/internal/shared/config"
	"time"

	"github.com/minio/minio-go/v7"
	"github.com/minio/minio-go/v7/pkg/credentials"
)

type MinioStorage struct {
	client *minio.Client
}

func New() *MinioStorage {
	endpoint := config.AppConfig.MinioHost + ":" + config.AppConfig.MinioPort
	accessKey := config.AppConfig.MinioAccessKey
	secretKey := config.AppConfig.MinioSecretKey
	useSSL := config.AppConfig.MinioUseSSL

	client, err := minio.New(endpoint, &minio.Options{
		Creds:  credentials.NewStaticV4(accessKey, secretKey, ""),
		Secure: useSSL,
	})
	if err != nil {
		log.Fatalln("Failed to connect to MinIO:", err)
		return nil
	}

	storage := &MinioStorage{
		client: client,
	}

	err = storage.Init()
	if err != nil {
		log.Fatalln("Failed to initialize MinIO storage:", err)
		return nil
	}

	return storage
}

func (s *MinioStorage) Init() error {
	buckets := []string{"images"}

	for _, bucket := range buckets {
		err := s.createBucket(bucket)
		if err != nil {
			return err
		}
	}

	return nil
}

func (s *MinioStorage) createBucket(bucketName string) error {
	exists, err := s.client.BucketExists(context.Background(), bucketName)
	if err != nil {
		return err
	}

	if !exists {
		err = s.client.MakeBucket(context.Background(), bucketName, minio.MakeBucketOptions{Region: "us-east-1"})
		if err != nil {
			return err
		}
		log.Printf("Bucket '%s' created successfully", bucketName)
	} else {
		log.Printf("Bucket '%s' already exists", bucketName)
	}

	return nil
}

func (s *MinioStorage) GetClient() *minio.Client {
	return s.client
}

func (s *MinioStorage) UploadFile(bucketName, objectName string, fileData []byte, contentType string) (string, error) {
	log.Printf("Uploading file to bucket: %s, object name: %s", bucketName, objectName)

	// Wgrywanie pliku
	_, err := s.client.PutObject(
		context.Background(),
		bucketName,
		objectName,
		bytes.NewReader(fileData),
		int64(len(fileData)),
		minio.PutObjectOptions{ContentType: contentType},
	)
	if err != nil {
		log.Printf("Failed to upload file to MinIO: %v", err)
		return "", err
	}

	// Generowanie URL-a (czas ważności: 3600 sekund = 1 godzina)
	expiry := time.Duration(3600) * time.Second // 1 godzina
	ctx, cancel := context.WithTimeout(context.Background(), expiry)
	defer cancel()

	url, err := s.client.PresignedGetObject(ctx, bucketName, objectName, time.Hour, nil)
	if err != nil {
		log.Printf("Failed to generate presigned URL: %v", err)
		return "", err
	}

	return url.String(), nil
}
