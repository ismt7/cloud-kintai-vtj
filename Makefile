setup:
	npm install

app-build:
	npm isntall
	npm run build

start:
	cd infra && \
	docker compose up -d frontend; \
	docker compose logs -f frontend

dev-start:
	cd infra && \
	docker compose up -d; \
	docker compose logs -f

stop:
	cd infra && docker compose down

test:
	npm test

ci-test:
	npm test -- --coverage --reporters=jest-junit

ci-eslint:
	npm run eslint -- --format junit --output-file ./reports/eslint/eslint.xml

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

gen-component:
	npx hygen sbgen with-prompt
