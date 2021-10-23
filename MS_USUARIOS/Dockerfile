FROM node:lts-alpine

RUN mkdir -p /home/node/app/node_modules

WORKDIR /home/node/app

COPY package*.json ./

RUN apk add --no-cache git

COPY . /home/node/app/

RUN chown -R node:node /home/node

RUN npm i

USER node

EXPOSE 3000

ENTRYPOINT ["node","server"]