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
	            params: { placa: cadastroVm.placa, modelo: cadastroVm.modelo, ano: cadastroVm.ano, fabricante: cadastroVm.fabricante, capacidade: cadastroVm.capacidade, odometro: cadastroVm.odometro }
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
    	cadastroVm.placa = null;
		cadastroVm.modelo = null;
		cadastroVm.ano = null;
		cadastroVm.fabricante = null;
		cadastroVm.capacidade = null;
		cadastroVm.odometro = null;
	}
}