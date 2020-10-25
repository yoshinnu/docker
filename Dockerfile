FROM node:12

WORKDIR /app

COPY /myapp/package*.json /app/

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "node", "./bin/www"]