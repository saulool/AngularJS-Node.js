angular
.module('app.abastecimentos')
.controller('CadastroAbastecimentoController', CadastroAbastecimentoController);

CadastroAbastecimentoController.$inject = ['$http', 'AbastecimentoModel'];

function CadastroAbastecimentoController($http, AbastecimentoModel){
	var cadastroVm = this;

	cadastroVm.abastecimento = new AbastecimentoModel();
	cadastroVm.abastecimento.novaSerie = false;
	cadastroVm.salvando = false;
	cadastroVm.salvo = false;
	cadastroVm.erroForm = false;

	cadastroVm.automoveis = ["Selecione"];

	cadastroVm.salvarAbastecimento = salvarAbastecimento;
	getAutomoveis();

	function salvarAbastecimento(){
		console.log(cadastroVm.form);
		if(cadastroVm.form.$valid){
			if(cadastroVm.abastecimento.qtdLitros <= cadastroVm.abastecimento.automovel.capacidade_tanque){
				cadastroVm.erroForm = false;
				cadastroVm.salvo = false;
				cadastroVm.salvando = true;
				$http({
		            method: 'POST',
		            url: 'http://localhost:3000/api/abastecimentos/cadastro',
		            params: { automovel: cadastroVm.abastecimento.automovel.id, tipoCombustivel: cadastroVm.abastecimento.tipoCombustivel, data: moment(cadastroVm.abastecimento.data, "DD/MM/YYYY").format("YYYY-MM-DD"), valorOdometro: cadastroVm.abastecimento.valorOdometro, qtdLitros: cadastroVm.abastecimento.qtdLitros, custoTotal: (cadastroVm.abastecimento.qtdLitros * cadastroVm.abastecimento.precoLitro), precoLitro: cadastroVm.abastecimento.precoLitro, novaSerie: cadastroVm.abastecimento.novaSerie }
		        }).then(function(response){
		        	console.log(response);
		        	cadastroVm.salvando = false;
		        	cadastroVm.salvo = true;
		        	limparForm();
		        });
			}else{
				cadastroVm.erroForm = true;
				cadastroVm.mensagemErro = "A quantidade de litros abastecida não pode ser maior que a capacidade do tanque";
			}
		}else{
			cadastroVm.erroForm = true;
			cadastroVm.mensagemErro = "Existem problemas no formulário";
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
        	cadastroVm.abastecimento.automovel = cadastroVm.automoveis[0];
        });
	}

	function limparForm(){
		cadastroVm.abastecimento.salvando = false;
    	cadastroVm.abastecimento.placa = null;
		cadastroVm.abastecimento.modelo = null;
		cadastroVm.abastecimento.ano = null;
		cadastroVm.abastecimento.fabricante = null;
		cadastroVm.abastecimento.capacidade = null;
		cadastroVm.abastecimento.odometro = null;
		cadastroVm.abastecimento.novaSerie = false;
	}
}