# Web

project web biu 2018

## Run the web server:


Run ```node webServer.js```

In order to send http request:

```
curl http://localhost:3000/calculate -X POST -H 'content-type: application/json' -d '{"calculatorState": null, "input": "1"}'
```

## Integration Tests

Run the server:

```
node webServer.js
```

Run the integration test


```
node serverTests.js
```

## Docker

 


Run ```sudo docker-compose up```
The aplication should be runnig on localhost:4000

