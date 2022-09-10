FROM node:14.17.3

WORKDIR /messenger

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD node server.js