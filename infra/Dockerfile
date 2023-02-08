FROM node:18.13.0 as build

WORKDIR /app

COPY package*.json ./

RUN npm ci --production

COPY . .

CMD ["npm", "run", "build"]

# Development
FROM node:18.13.0 as dev

RUN apt-get update && apt-get install -y \
  libnss3 \
  libatk1.0-0 \
  libatk-bridge2.0-0 \
  libcups2 \
  libatspi2.0 \
  libxcomposite-dev \
  libgbm-dev \
  libxkbcommon-x11-0 \
  libasound2 \
  libxdamage1 \
  libxrandr2 \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]

# Production
FROM node:18.13.0-alpine

WORKDIR /app

COPY --from=build /app/build /app

RUN npm install -g serve

CMD ["serve", "-s", "."]
