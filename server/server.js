var express = require('express');
var app = express();
global.mysql = require('mysql');
global.connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'gestor_automoveis',
  port: 3306
});

global.__base = __dirname + '/';

connection.connect();

app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT");
    next();
});

app.use(express.static('./../client'));

var routes = require('./routes')(app);

var port = 3000;

app.listen(port, function () {
  console.log('Gestor de automóveis rodando na porta  '+port);
});