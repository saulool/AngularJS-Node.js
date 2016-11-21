var app = angular.module('app.relatorios', ['ui.router']);

app.config(function($stateProvider) {
  var relatoriosAbastecimentosState = {
    name: 'relatoriosAbastecimentos',
    url: '/relatorios/abastecimentos',
    templateUrl: '/modules/relatorios/views/abastecimentos.html'
  }

  var relatoriosConsumoState = {
    name: 'relatoriosConsumo',
    url: '/relatorios/consumo',
    templateUrl: '/modules/relatorios/views/consumo.html'
  }

  $stateProvider.state(relatoriosAbastecimentosState);
  $stateProvider.state(relatoriosConsumoState);
});