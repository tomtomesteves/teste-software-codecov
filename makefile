# Makefile para a aplicação e Docker Compose

# Comandos para a aplicação
.PHONY: run test

run:
	docker-compose -f src/backend/infra/docker-compose.yml up -d
	cd src/frontend && yarn install
	cd src/frontend && yarn start

test:
	PYTHONPATH=src/backend pytest
	# cd src/frontend && yarn test --watchAll=false &

test-report:
	PYTHONPATH=src/backend coverage run -m pytest src/backend/tests
	coverage report -m
	# cd src/frontend && yarn reportsour--watchAll=false &

# Comandos para o Docker Compose
.PHONY: docker-up docker-down docker-clean-setup

docker-up:
	docker-compose -f src/backend/infra/docker-compose.yml up -d

docker-down:
	docker-compose -f src/backend/infra/docker-compose.yml down

docker-clean-setup:
	docker rmi infra-backend
	docker-compose -f src/backend/infra/docker-compose.yml down -v
