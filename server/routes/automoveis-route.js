'use strict';

var automoveisService = require(global.__base + 'services/AutomoveisService');

module.exports = function(app){
  app.get('/api/automoveis', function (req, res) {
    automoveisService.getAutomoveis(req, res);
  });

  app.post('/api/automoveis/cadastro', function (req, res) {
    automoveisService.cadastrarAutomovel(req, res);
  });

  app.post('/api/automoveis/editar', function (req, res) {
    automoveisService.editarAutomovel(req, res);
  });

  app.get('/api/automoveis/automovel', function (req, res) {
    automoveisService.getAutomovel(req, res);
  });

  app.get('/api/automoveis/automovel/porplaca', function (req, res) {
    automoveisService.getAutomovelPorPlaca(req, res);
  });
}