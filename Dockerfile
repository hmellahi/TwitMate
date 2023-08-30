FROM node:14.16.0-alpine

WORKDIR /usr/src/app

RUN apk add --update python make g++\
   && rm -rf /var/cache/apk/*
   
COPY package.json .

RUN npm install 
COPY . .

CMD npm run dev