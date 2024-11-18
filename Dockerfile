FROM node:18.17.1 AS dev-deps

WORKDIR /app

COPY package.json package.json

RUN npm install

FROM node:18.17.1 AS builder

WORKDIR /app

COPY --from=dev-devps  /app/node_modules ./node_modules

COPY . .

RUN npm run build

FROM nginx:1.23.3 as prod

EXPOSE 80

COPY --from=builder /app/dist/app-web/browser/ /usr/share/nginx/html

CMD [ "nginx", "-g", "deamon off;" ]