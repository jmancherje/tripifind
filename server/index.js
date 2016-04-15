const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const session = require('express-session');
require('dotenv').config();

const router = require('./routes');
const app = express();

const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// app.use(session({secret: '1234567890QWERTY'}));

app.use('/api', router);
require('./models/dbroutes.js')(app, express);

app.use(express.static(__dirname+'/../public'));


app.listen(port);
console.log('Listening on ' + port);

module.exports = app; 