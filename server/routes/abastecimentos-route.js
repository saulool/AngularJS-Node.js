'use strict';

var abastecimentosService = require(global.__base + 'services/AbastecimentosService');

module.exports = function(app){
  app.post('/api/abastecimentos/cadastro', function (req, res) {
  	console.log('bateu route');
    abastecimentosService.cadastrarAbastecimento(req, res);
  });

  app.get('/api/abastecimentos', function (req, res) {
    abastecimentosService.getAbastecimentos(req, res);
  });

  app.get('/api/abastecimentos/ultimos', function (req, res) {
    abastecimentosService.getUltimosAbastecimentos(req, res);
  });

  app.get('/api/abastecimentos/mes', function (req, res) {
    abastecimentosService.getAbastecimentosPorMes(req, res);
  });

  app.get('/api/abastecimentos/pordata', function (req, res) {
    abastecimentosService.getAbastecimentosPorData(req, res);
  });
}