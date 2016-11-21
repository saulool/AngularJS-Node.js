angular
.module('app.abastecimentos')
.controller('CadastroAbastecimentoController', CadastroAbastecimentoController);

CadastroAbastecimentoController.$inject = ['$http'];

function CadastroAbastecimentoController($http){
	var cadastroVm = this;

	cadastroVm.automoveis = ["Selecione"];

	cadastroVm.automovel = null;
	cadastroVm.tipoCombustivel = 'gasolina';
	cadastroVm.data = null;
	cadastroVm.valorOdometro = null;
	cadastroVm.qtdLitros = null;
	cadastroVm.custoTotal = null;
	cadastroVm.precoLitro = null;
	cadastroVm.novaSerie = false;
	cadastroVm.salvando = false;
	cadastroVm.salvo = false;
	cadastroVm.erroForm = false;

	cadastroVm.salvarAbastecimento = salvarAbastecimento;
	getAutomoveis();

	function salvarAbastecimento(){
		if(cadastroVm.form.$valid){
			cadastroVm.erroForm = false;
			cadastroVm.salvo = false;
			cadastroVm.salvando = true;
			$http({
	            method: 'POST',
	            url: 'http://localhost:3000/api/abastecimentos/cadastro',
	            params: { automovel: cadastroVm.automovel.id, tipoCombustivel: cadastroVm.tipoCombustivel, data: moment(cadastroVm.data, "DD/MM/YYYY").format("YYYY-MM-DD"), valorOdometro: cadastroVm.valorOdometro, qtdLitros: cadastroVm.qtdLitros, custoTotal: cadastroVm.custoTotal, precoLitro: cadastroVm.precoLitro, novaSerie: cadastroVm.novaSerie }
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

	function getAutomoveis(){
		$http(
        {
            method: 'GET',
            url: 'http://localhost:3000/api/automoveis'
        }).then(function(response){
        	console.log(response);
        	cadastroVm.automoveis = response.data;
        	cadastroVm.automovel = cadastroVm.automoveis[0];
        });
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