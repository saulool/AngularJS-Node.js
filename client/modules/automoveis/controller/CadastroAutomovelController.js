angular
.module('app.automoveis')
.controller('CadastroAutomovelController', CadastroAutomovelController);

CadastroAutomovelController.$inject = ['$http'];

function CadastroAutomovelController($http){
	var cadastroVm = this;

	cadastroVm.placa = null;
	cadastroVm.modelo = null;
	cadastroVm.ano = null;
	cadastroVm.fabricante = null;
	cadastroVm.capacidade = null;
	cadastroVm.odometro = null;

	cadastroVm.salvarAutomovel = salvarAutomovel;

	function salvarAutomovel(){
		console.log(cadastroVm.formAutomovel);
		
	}
}