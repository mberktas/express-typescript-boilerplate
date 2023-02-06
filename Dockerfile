FROM node:16-alpine

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

RUN npm run build


CMD ["node" , "dist/index.js"]