FROM node:16-alpine

WORKDIR /home/node/app

COPY package*.json .

COPY tsconfig.json .

RUN npm install

COPY . .


EXPOSE 8080

CMD ["npm","start"]