FROM node:alpine
WORKDIR /home/node/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run-script build

EXPOSE 5000

CMD [ "node", "dist/index.js" ]