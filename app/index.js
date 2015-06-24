var express = require('express');
var morgan = require('morgan');

var app = express()
        .use(morgan('common'))
        .use('/static/', express.static('static'))
        .use('/bower/', express.static('bower_components'))
        .get('/status/', require('./status'))
        .get('/bhive/', require('./bhive'))

module.exports = app;
