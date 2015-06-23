/********************** require all packages*******************/
var express = require('express');


/********************* initialization ************************/
var app = express();

require('./config/middleware.js')(app, express);


module.exports = app;