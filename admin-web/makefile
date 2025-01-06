v ?= 0.0.1

build:
	git pull
	docker build --build-arg VERSION=$(v) -t shop-admin-web:$(v) -f ./dockerfile .
	docker rm -f shop-admin-web
	docker run -d -p 8080:8080 --name shop-admin-web shop-admin-web:$(v)