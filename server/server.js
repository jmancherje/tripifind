var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session');
require('dotenv').config()

const router = require('./routes');
var app = express();

var port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(session({secret: '1234567890QWERTY'}));

app.use('/api', router);
require('./models/dbroutes.js')(app, express);

app.use(express.static(__dirname+'/../public'));


app.listen(port);
console.log('Listening on ' + port);

module.exports = app; 