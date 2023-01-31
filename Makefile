setup:
	git config --local core.hooksPath .githooks

install:
	npm install

start:
	cd infra && docker compose -f docker-compose.yml up -d

test:
	npm test && npm run test-storybook

storybook:
	npm run storybook

dev-start:
	cd infra && docker compose up -d
