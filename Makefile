setup:
	git config --local core.hooksPath .githooks

install:
	npm install

start:
	cd infra && docker compose up -d frontend

test:
	npm test

test-storybook:
	npm run test-storybook

storybook:
	cd infra && docker compose up -d storybook

dev-start:
	cd infra && docker compose up -d

openapi-codegen:
	docker run --rm \
		-v ${PWD}:/local openapitools/openapi-generator-cli generate \
		-i http://host.docker.internal:8000/openapi.json \
		-g typescript-fetch \
		-o /local/src/api
