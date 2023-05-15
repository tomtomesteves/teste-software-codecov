# Makefile para a aplicação e Docker Compose

# Comandos para a aplicação
.PHONY: run test

run:
	echo "Not implemented"
	exit 1
	# python src/backend/app.py

test:
	PYTHONPATH=src/backend pytest

test-report:
	PYTHONPATH=src/backend coverage run -m  pytest
	coverage report -m

# Comandos para o Docker Compose
.PHONY: docker-up docker-down docker-clean-setup

docker-up:
	docker-compose -f src/backend/infra/docker-compose.yml up -d

docker-down:
	docker-compose -f src/backend/infra/docker-compose.yml down

docker-clean-setup:
	docker rmi infra-backend
	docker-compose -f src/backend/infra/docker-compose.yml down -v
