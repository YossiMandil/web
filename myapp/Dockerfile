FROM node

WORKDIR app

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "node", "webServer.js" ]