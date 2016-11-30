angular
.module('app.automoveis')
.controller('EditarAutomovelController', EditarAutomovelController);

EditarAutomovelController.$inject = ['$http', '$stateParams', 'AutomovelModel'];

function EditarAutomovelController($http, $stateParams, AutomovelModel){
	var editarVm = this;

	editarVm.automovel = new AutomovelModel();
	editarVm.salvando = false;
	editarVm.salvo = false;
	editarVm.erroForm = false;

	editarVm.editarAutomovel = editarAutomovel;

	getAutomovel($stateParams.id);

	function getAutomovel(id){
		$http({
            method: 'GET',
            url: 'http://localhost:3000/api/automoveis/automovel',
            params: { id: id }
        }).then(function(response){
        	var automovel = response.data[0];

        	editarVm.automovel.placa = automovel.placa;
			editarVm.automovel.modelo = automovel.modelo;
			editarVm.automovel.ano = automovel.ano;
			editarVm.automovel.fabricante = automovel.fabricante;
			editarVm.automovel.capacidade = automovel.capacidade_tanque;
			editarVm.automovel.odometro = automovel.odometro;
        });
	}

	function editarAutomovel(){
		if(editarVm.form.$valid){
			editarVm.erroForm = false;
			editarVm.salvo = false;
			editarVm.salvando = true;


			$http({
	            method: 'GET',
	            url: 'http://localhost:3000/api/automoveis/automovel/porplaca',
	            params: { placa: editarVm.automovel.placa }
	        }).then(function(response){
	        	console.log(response);
	        	if(response.data.length && response.data[0].id != $stateParams.id){
	        		editarVm.erroForm = true;
	        		editarVm.salvando = false;
	        	}else{
	        		$http({
			            method: 'POST',
			            url: 'http://localhost:3000/api/automoveis/editar',
			            params: { id: $stateParams.id, placa: editarVm.automovel.placa, modelo: editarVm.automovel.modelo, ano: editarVm.automovel.ano, fabricante: editarVm.automovel.fabricante, capacidade: editarVm.automovel.capacidade, odometro: editarVm.automovel.odometro }
			        }).then(function(response){
			        	console.log(response);
			        	editarVm.salvando = false;
			        	editarVm.salvo = true;
			        });
	        	}
	        });

			
		}else{
			editarVm.erroForm = true;
			editarVm.salvando = false;
		}
	}
}