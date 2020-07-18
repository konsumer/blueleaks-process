help: ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

build: ## build docker container
	docker build --tag blueleaks .

publish: build ## publish docker container
	docker tag blueleaks konsumer/blueleaks
	docker push konsumer/blueleaks

text: ## extract text from files in blueleaks dir
	docker run -v ${PWD}/blueleaks:/usr/app/input -v ${PWD}/output:/usr/app/output -it --rm blueleaks text

pii: ## extract PII from files in output dir into sqlite
	docker run -v ${PWD}/output:/usr/app/output -it --rm blueleaks pii
