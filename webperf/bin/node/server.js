// Load the http module to create an http server.
var http = require('http');
var url  = require('url');
var winston = require('winston');
var ua_parser = require('ua-parser');

// Configure Winston (Logging)
//winston.add(winston.transports.File, { filename: '/var/log/rum.log', json: false, timestamp: false });
//winston.remove(winston.transports.Console);

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {


function getClientIp(request){ 
    with(request)
        return (headers['x-forwarded-for'] || '').split(',')[0] 
            || connection.remoteAddress
}

  var obj = url.parse(request.url, true).query;
  obj["ua_raw"] = ua_parser.parse(request.headers['user-agent']); 
  obj["referer"] = request.headers['referrer'] || request.headers['referer'];
  //obj["client_ip"] = getClientIp(request);
  obj["clientip"] = '130.253.37.97';
   
  // Convert object to string for logging 
  var string = JSON.stringify(obj);

  response.writeHead(200, {"Content-Type": "text/plain"});
  response.end("Hello World\n");
  winston.log('info', string );


});

// Listen on port 7000, IP defaults to 127.0.0.1
server.listen(7000);

// Put a friendly message on the terminal
// console.log("Server running at http://127.0.0.1:7000/");
