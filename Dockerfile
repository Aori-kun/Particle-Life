# - BUILD STAGE - #
FROM node:24-alpine AS build

LABEL authors="Aori"

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

RUN npx esbuild --version

COPY . .

RUN npm run build

# - CADDY - #
FROM caddy:alpine
COPY --from=build /app/dist /usr/share/caddy
COPY --from=build /app/Caddyfile /etc/caddy/Caddyfile
