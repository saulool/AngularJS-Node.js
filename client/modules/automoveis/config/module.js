var app = angular.module('app.automoveis', ['ui.router']);

app.config(function($stateProvider) {
  var automoveisInformacoesState = {
    name: 'automoveisInformacoes',
    url: '/automoveis/informacoes',
    templateUrl: '/modules/automoveis/views/informacoes.html'
  }

  var automoveisCadastroState = {
    name: 'automoveisCadastro',
    url: '/automoveis/cadastro',
    templateUrl: '/modules/automoveis/views/cadastro.html'
  }

  var automoveisEdicaoState = {
    name: 'automoveisEditar',
    url: '/automoveis/editar/:id',
    templateUrl: '/modules/automoveis/views/editar.html'
  }

  $stateProvider.state(automoveisInformacoesState);
  $stateProvider.state(automoveisCadastroState);
  $stateProvider.state(automoveisEdicaoState);
});