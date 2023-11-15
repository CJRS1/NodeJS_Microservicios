# FROM node:14.21.2

# WORKDIR /application

# COPY package.json .

# RUN npm install

# COPY . .

# CMD ["npm","run","start"]

FROM node:14.21.2-alpine

ARG BASE_DIR

WORKDIR /application

COPY ${BASE_DIR}/package.json .

RUN npm install

COPY ${BASE_DIR}/. .

CMD ["npm","run","start"]