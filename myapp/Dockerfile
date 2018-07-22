FROM node

WORKDIR app

RUN npm install

COPY . .

EXPOSE 9090

CMD [ "node", "webServer.js" ]
