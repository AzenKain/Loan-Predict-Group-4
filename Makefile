# Tên images
FE_IMAGE=azenkain/felp:latest
BE_IMAGE=azenkain/apilp:latest

.PHONY: build_fe build_be push_fe push_be deploy_fe deploy_be

# Build Frontend
build_fe:
	@echo "Building Frontend..."
	docker build --no-cache -t $(FE_IMAGE) ./front-end

# Build Backend
build_be:
	@echo "Building Backend..."
	docker build --no-cache -t $(BE_IMAGE) ./back-end

# Push Frontend
push_fe:
	@echo "Pushing Frontend..."
	docker push $(FE_IMAGE)

# Push Backend
push_be:
	@echo "Pushing Backend..."
	docker push $(BE_IMAGE)

# Build & Push Frontend
deploy_fe: build_fe push_fe
	@echo "Frontend Deployed!"

# Build & Push Backend
deploy_be: build_be push_be
	@echo "Backend Deployed!"
