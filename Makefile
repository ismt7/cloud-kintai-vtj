setup:
	./.devcontainer/setup.sh

app-build:
	npm isntall
	npm run build

start:
	npm start

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
	npm run storybook

openapi-codegen:
	npx openapi \
		--input http://app:8000/openapi.json \
		--output ./src/client \
		--client axios

gen-component:
	npx hygen sbgen with-prompt

clean-docker:
	docker system prune -f

chromatic:
	npm run chromatic