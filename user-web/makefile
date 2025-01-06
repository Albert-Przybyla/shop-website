v ?= 0.0.1

build:
	git pull
	docker build --build-arg VERSION=$(v) -t shop-user-web:$(v) -f ./dockerfile .
	docker rm -f shop-user-web
	docker run -d -p 8080:8080 --name shop-user-web shop-user-web:$(v)