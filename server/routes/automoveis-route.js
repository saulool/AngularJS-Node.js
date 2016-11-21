'use strict';

var request = require('request');
var qs = require('querystring');

module.exports = function(app){
  app.get('/api/automoveis', function (req, res) {
    connection.query('SELECT * FROM automoveis', function(err, rows, fields) {
      if (err) throw err;

      res.send(JSON.stringify(rows));
    });
  });

  app.post('/api/automoveis/cadastro', function (req, res) {
  	var query = 'INSERT INTO automoveis (placa, modelo, ano, fabricante, capacidade_tanque, odometro) VALUES ("' + req.query.placa + '","' + req.query.modelo + '",' + parseInt(req.query.ano) + ',"' + req.query.fabricante + '",' + parseInt(req.query.capacidade) + ',' + parseInt(req.query.odometro) + ')';
    console.log(query);

    connection.query(query, function(err, rows, fields) {
      if (err) throw err;

      res.send(JSON.stringify(rows));
    });
  });
}