// todo readme
var http = require('http');
var fs = require('fs');
var web = require('./calculator');
const express = require('express');
const app = express()
app.use(express.json());


app.use(express.static(__dirname + '/public'))


app.post('/calculate', function(req, res) {
  console.log(req.body);
  //todo checkout if calculate next step gets json or string
  var s = req.body.calculatorState;
  if (s!=null){
      s = JSON.stringify(s);
  }
  res.send(web.calculateNextState(s,
    req.body.input));

})

app.listen(3000, () => console.log('listening...'))
