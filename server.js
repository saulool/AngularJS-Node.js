var express = require('express');
var app = express();

app.use(function(req, res, next) {
  	res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT");
    next();
});

app.use(express.static('.'));
app.use(express.static('src'));

var port = 3000;

app.listen(port, function () {
  console.log('Gestor de automóveis rodando na porta  '+port);
});