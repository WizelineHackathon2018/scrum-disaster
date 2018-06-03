CURRENT_DIRECTORY=./

BASE_COMPOSE=-f $(CURRENT_DIRECTORY)/docker-compose.yml
DEV_COMPOSE=$(BASE_COMPOSE) -f $(CURRENT_DIRECTORY)/docker-compose.dev.yml

help: Makefile
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

build: ## Build all or single services
	@docker-compose $(BASE_COMPOSE) build $(service)

bash: ## SSH into service container
	@docker-compose $(BASE_COMPOSE) exec $(service) /bin/bash

push: ## Push project images as latest (or custom version)
	@$(CURRENT_DIRECTORY)/scripts/docker-login.sh
	@$(CURRENT_DIRECTORY)/scripts/push-images.sh --force $(version)

dev: ## Lift dev environment or single service
	@docker-compose $(DEV_COMPOSE) -f $(CURRENT_DIRECTORY)/services/$(service)/docker-compose.dev.yml up $(service)

dev-down: ## Destroy dev environment
	@docker-compose $(DEV_COMPOSE) down

logs: ## Display logs for given service
	@docker-compose $(BASE_COMPOSE) logs -f $(service)

integration: ## Orchestrate whole integration setup
	@docker-compose $(DEV_COMPOSE) \
		-f $(CURRENT_DIRECTORY)/services/api/docker-compose.dev.yml \
		-f $(CURRENT_DIRECTORY)/docker-compose.integration.yml up -d api
