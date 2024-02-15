FROM node:latest as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . ./

RUN npx vite build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080

COPY nginx.conf /etc/nginx/conf.d/default.conf