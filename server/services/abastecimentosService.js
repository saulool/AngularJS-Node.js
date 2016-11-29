'use strict';

var request = require('request');

module.exports = {
	cadastrarAbastecimento : cadastrarAbastecimento,
	getAbastecimentos : getAbastecimentos,
  getUltimosAbastecimentos : getUltimosAbastecimentos
}

function cadastrarAbastecimento(req, res){
  var novaSerie = 0;

  if(req.query.novaSerie != "false"){
    novaSerie = 1;
  }

  var query = 'INSERT INTO abastecimentos (id_automovel, tipo_combustivel, data, valor_odometro, quantidade_litros, custo_total, preco_litro, nova_serie) VALUES ("' + req.query.automovel + '","' + req.query.tipoCombustivel + '","' + req.query.data + '","' + req.query.valorOdometro + '",' + req.query.qtdLitros + ',' + req.query.custoTotal + ',' + req.query.precoLitro + ',' + novaSerie + ')';
  console.log(query);

  connection.query(query, function(err, rows, fields) {
    if (err) throw err;

    res.send(JSON.stringify(rows));
  });
}

function getAbastecimentos(req, res){
  var query = 'SELECT * FROM abastecimentos ab JOIN automoveis at on ab.id_automovel = at.id ORDER BY at.placa, ab.data;';
  console.log(query);

  connection.query(query, function(err, rows, fields) {
    if (err) throw err;

    console.log(rows);

    res.send(JSON.stringify(rows));
  });
}

function getUltimosAbastecimentos(req, res){
  var query = 'SELECT at.id, at.placa, ab.data, ab.valor_odometro, ab.quantidade_litros, ab.custo_total, ab.preco_litro, ab.nova_serie FROM abastecimentos ab JOIN automoveis at on ab.id_automovel = at.id where ab.data between date_add(now(), INTERVAL -6 MONTH) and date(Now()) ORDER BY at.placa, ab.data;';
  console.log(query);

  connection.query(query, function(err, rows, fields) {
    if (err) throw err;

    console.log(rows);

    res.send(JSON.stringify(rows));
  });
}