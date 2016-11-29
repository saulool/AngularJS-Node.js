'use strict';

var abastecimentosService = require(global.__base + 'services/AbastecimentosService');

module.exports = function(app){
  app.post('/api/abastecimentos/cadastro', function (req, res) {
    abastecimentosService.cadastrarAbastecimento(req, res);
  });

  app.get('/api/abastecimentos', function (req, res) {
    abastecimentosService.getAbastecimentos(req, res);
  });

  app.get('/api/abastecimentos/ultimos', function (req, res) {
    abastecimentosService.getUltimosAbastecimentos(req, res);
  });
}