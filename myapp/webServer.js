var http = require('http');
var fs = require('fs');
var web = require('./web');
var querystring = require('querystring');
var c = 1;



/*http.createServer(function(req, res){
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
}).listen(80);*/


/*http.createServer(function(req, res){
    app.post(function(req,res){
        console.log(req.body);
    });
}).listen(3000);*/


var server = http.createServer().listen(3000);

server.on('request', function (req, res) {
    if (req.method == 'POST') {
        var body = '';
    }

    req.on('data', function (data) {
        body += data;
    });

    req.on('end', function () {
        var post = querystring.parse(body);
        console.log(c++);
        console.log(post);
        res.writeHead(200, {'Content-Type': 'text/plain'});
        d= c-1
        res.end('Hello World: '+ d+'\n');
    });
});

console.log('Listening on port 3000');