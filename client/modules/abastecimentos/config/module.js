var app = angular.module('app.abastecimentos', ['ui.router']);

app.config(function($stateProvider) {
  var abastecimentosCadastroState = {
    name: 'abastecimentosCadastro',
    url: '/abastecimentos/cadastro',
    templateUrl: '/modules/abastecimentos/views/cadastro.html'
  }

  $stateProvider.state(abastecimentosCadastroState);
});