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

  app.post('/api/automoveis/editar', function (req, res) {
  	var query = 'UPDATE automoveis SET placa = "' + req.query.placa + '" , modelo = "' + req.query.modelo + '", ano = ' + req.query.ano + ', fabricante = "' + req.query.fabricante + '", capacidade_tanque = ' + req.query.capacidade + ', odometro = ' + req.query.odometro + ' WHERE id = ' + req.query.id;
  	console.log(query);

    connection.query(query, function(err, rows, fields) {
      if (err) throw err;

      res.send(JSON.stringify(rows));
    });
  });

  app.get('/api/automoveis/automovel', function (req, res) {
  	var query = 'SELECT * FROM automoveis WHERE id = ' + req.query.id;
  	console.log(query);

    connection.query(query, function(err, rows, fields) {
      if (err) throw err;

      res.send(JSON.stringify(rows));
    });
  });
}