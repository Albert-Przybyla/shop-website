user: 
	@go run bin/user/main.go

admin:
	@go run bin/admin/main.go

v ?= 0.0.1

build-user:
	git pull
	docker build --build-arg VERSION=$(v) -t shop-user-api:$(v) -f ./dockerfile.user .
	docker rm -f shop-user-api
	docker run -d -p 8080:8080 --name shop-user-api shop-user-api:$(v)


build-admin:
	git pull
	docker build --build-arg VERSION=$(v) -t shop-admin-api:$(v) -f ./dockerfile.admin .
	docker rm -f shop-admin-api
	docker run -d -p 8080:8080 --name shop-admin-api shop-admin-api:$(v)
