angular
.module('app.automoveis')
.controller('InformacoesController', InformacoesController);

InformacoesController.$inject = ['$http'];

function InformacoesController($http){
	var informacoesVm = this;

	informacoesVm.automoveis = [];

	$http(
        {
            method: 'GET',
            url: 'http://localhost:3000/api/automoveis'
        }).then(function(response){
        	informacoesVm.automoveis = response.data;
        });
}