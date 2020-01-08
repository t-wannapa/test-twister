 process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const express = require('./config/express');
const mongoose = require('./config/mongoose');
var passport = require('./config/passport');

var db = mongoose();
var app = express();
var passport = passport();

app.listen(3000);

console.log('Server running at http://localhost:3000');
