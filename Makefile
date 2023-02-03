setup:
	git config --local core.hooksPath .githooks

install:
	npm install

start:
	cd infra && docker compose -f docker-compose.yml up -d

test:
	npm test

test-storybook:
	npm run test-storybook

storybook:
	ESLINT_NO_DEV_ERRORS=true npm run storybook

dev-start:
	cd infra && docker compose up -d

openapi-codegen:
	swagger-codegen generate \
		-i http://localhost:8000/openapi.json \
		-l typescript-fetch \
		-o ./src/api
