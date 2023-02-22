setup:
	git config --local core.hooksPath .githooks

install:
	npm install

build:
	npm isntall
	npm run build

start:
	cd infra && docker compose up -d frontend

stop:
	cd infra && docker compose down

test:
	npm test

test-storybook:
	npm run test-storybook

storybook:
	cd infra && docker compose up -d storybook

openapi-codegen:
	docker run --rm \
		-v ${PWD}:/local openapitools/openapi-generator-cli generate \
		-i http://host.docker.internal:8000/openapi.json \
		-g typescript-fetch \
		-o /local/src/api
