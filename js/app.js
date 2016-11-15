var app = angular.module('app', ['ui.router']);

app.config(function($stateProvider) {
  var dashboardState = {
    name: 'dashboard',
    url: '/dashboard',
    templateUrl: './views/dashboard.html'
  }

  var automoveisState = {
    name: 'automoveis',
    url: '/automoveis',
    templateUrl: './views/automoveis.html'
  }

  var abastecimentosState = {
    name: 'abastecimentos',
    url: '/abastecimentos',
    templateUrl: './views/abastecimentos.html'
  }

  var relatoriosState = {
    name: 'relatorios',
    url: '/relatorios',
    templateUrl: './views/relatorios.html'
  }

  $stateProvider.state(dashboardState);
  $stateProvider.state(automoveisState);
  $stateProvider.state(abastecimentosState);
  $stateProvider.state(relatoriosState);
});