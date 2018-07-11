var http = require('http');
var fs = require('fs');
var web = require('./web');


http.createServer(function(req, res){
    let s = null
    s = web.calculateNextState(null, "1");
    console.log(JSON.parse(s).display) // 1
    s = web.calculateNextState(s, "2")
    console.log(JSON.parse(s).display) // 12
    s = web.calculateNextState(s, "+")
    console.log(JSON.parse(s).display) // 12
    s = web.calculateNextState(s, "4")
    console.log(JSON.parse(s).display) // 4
    s = web.calculateNextState(s, "3" )
    console.log(JSON.parse(s).display) // 43
    s = web.calculateNextState(s, "=")
    console.log(JSON.parse(s).display) // 55
    s = web.calculateNextState(s, "+")
    console.log(JSON.parse(s).display) // 55
    s = web.calculateNextState(s, "1")
    console.log(JSON.parse(s).display) // 1
    s = web.calculateNextState(s, "=")
    console.log(JSON.parse(s).display) // 56
    s = web.calculateNextState(s, "5")
    console.log(JSON.parse(s).display) // 5
}).listen(80);