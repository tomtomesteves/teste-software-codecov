# Makefile para a aplicação e Docker Compose

# Comandos para a aplicação
.PHONY: run test

run:
	python src/backend/app.py

test:
	PYTHONPATH=src/backend pytest

# Comandos para o Docker Compose
.PHONY: docker-up docker-down docker-clean-setup

docker-up:
	docker-compose -f src/backend/infra/docker-compose.yml up -d

docker-down:
	docker-compose -f src/backend/infra/docker-compose.yml down

docker-clean-setup:
	docker-compose -f src/backend/infra/docker-compose.yml down -v