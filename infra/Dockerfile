FROM node:18.13.0 AS deps

WORKDIR /app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]

RUN npm ci --only=production

COPY . .

# Development
FROM node:18.13.0 AS development

ENV CI=true
ENV PORT=3000
ENV NODE_ENV=development

WORKDIR /app

COPY --from=deps /app .

CMD ["npm", "start"]

# Production
FROM node:18.13.0 AS production

ENV CI=true
ENV NODE_ENV=production

WORKDIR /app

RUN npm install -g serve

COPY --from=deps /app .

RUN npm run build

CMD ["serve", "-s", "-l", "80", "build"]
