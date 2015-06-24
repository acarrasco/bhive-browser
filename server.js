var http = require('http');

var config = require('./app/config');

var app = require("./app");
http.createServer(app).listen(config.port);
