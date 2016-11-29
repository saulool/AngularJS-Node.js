angular
.module('app.automoveis')
.controller('CadastroAutomovelController', CadastroAutomovelController);

CadastroAutomovelController.$inject = ['$http', 'AutomovelModel'];

function CadastroAutomovelController($http, AutomovelModel){
	var cadastroVm = this;

	cadastroVm.automovel = new AutomovelModel();
	cadastroVm.salvando = false;
	cadastroVm.salvo = false;
	cadastroVm.erroForm = false;

	cadastroVm.salvarAutomovel = salvarAutomovel;

	function salvarAutomovel(){
		if(cadastroVm.form.$valid){
			cadastroVm.erroForm = false;
			cadastroVm.salvo = false;
			cadastroVm.salvando = true;
			$http({
	            method: 'POST',
	            url: 'http://localhost:3000/api/automoveis/cadastro',
	            params: { placa: cadastroVm.automovel.placa, modelo: cadastroVm.automovel.modelo, ano: cadastroVm.automovel.ano, fabricante: cadastroVm.automovel.fabricante, capacidade: cadastroVm.automovel.capacidade, odometro: cadastroVm.automovel.odometro }
	        }).then(function(response){
	        	console.log(response);
	        	cadastroVm.salvando = false;
	        	cadastroVm.salvo = true;
	        	limparForm();
	        });
		}else{
			cadastroVm.erroForm = true;
		}
	}

	function limparForm(){
		cadastroVm.salvando = false;
    	cadastroVm.automovel.placa = null;
		cadastroVm.automovel.modelo = null;
		cadastroVm.automovel.ano = null;
		cadastroVm.automovel.fabricante = null;
		cadastroVm.automovel.capacidade = null;
		cadastroVm.automovel.odometro = null;
	}
}