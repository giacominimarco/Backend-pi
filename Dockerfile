FROM node:12-alpine

WORKDIR /usr/app

ADD package*.json ./

RUN yarn

COPY . .

EXPOSE 3000
CMD ["yarn", "start"]
