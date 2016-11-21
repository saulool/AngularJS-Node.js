'use strict';

var request = require('request');
var qs = require('querystring');

module.exports = function(app){
  app.post('/api/abastecimentos/cadastro', function (req, res) {

    var novaSerie = 0;

    if(req.query.novaSerie){
      novaSerie = 1;
    }

    var query = 'INSERT INTO abastecimentos (id_automovel, tipo_combustivel, data, valor_odometro, quantidade_litros, custo_total, preco_litro, nova_serie) VALUES ("' + req.query.automovel + '","' + req.query.tipoCombustivel + '","' + req.query.data + '","' + req.query.valorOdometro + '",' + req.query.qtdLitros + ',' + req.query.custoTotal + ',' + req.query.precoLitro + ',' + novaSerie + ')';
    console.log(query);

    connection.query(query, function(err, rows, fields) {
      if (err) throw err;

      res.send(JSON.stringify(rows));
    });
  });

  app.get('/api/abastecimentos', function (req, res) {

    var query = 'SELECT * FROM abastecimentos ab JOIN automoveis at on ab.id_automovel = at.id;';
    console.log(query);

    connection.query(query, function(err, rows, fields) {
      if (err) throw err;

      console.log(rows);

      res.send(JSON.stringify(rows));
    });
  });
}