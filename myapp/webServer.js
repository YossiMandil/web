var http = require('http');
var fs = require('fs');
var web = require('./web');
const express = require('express');
const app = express()
app.use(express.json());


app.use(express.static(__dirname + '/public'))


app.post('/calculate', function(req, res) {
  console.log('shit just got real');

  console.log(req.body);
  res.send(req.body);

})

app.listen(3000, () => console.log('listening...'))