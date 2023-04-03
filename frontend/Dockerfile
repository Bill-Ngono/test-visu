FROM node:16.14.0-alpine

WORKDIR /home/react_app

COPY package*.json .

RUN npm ci

COPY . .

EXPOSE 3000