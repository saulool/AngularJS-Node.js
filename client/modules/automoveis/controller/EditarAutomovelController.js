angular
.module('app.automoveis')
.controller('EditarAutomovelController', EditarAutomovelController);

EditarAutomovelController.$inject = ['$http', '$stateParams'];

function EditarAutomovelController($http, $stateParams){
	var editarVm = this;

	editarVm.placa = null;
	editarVm.modelo = null;
	editarVm.ano = null;
	editarVm.fabricante = null;
	editarVm.capacidade = null;
	editarVm.odometro = null;
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

        	editarVm.placa = automovel.placa;
			editarVm.modelo = automovel.modelo;
			editarVm.ano = automovel.ano;
			editarVm.fabricante = automovel.fabricante;
			editarVm.capacidade = automovel.capacidade_tanque;
			editarVm.odometro = automovel.odometro;
        });
	}

	function editarAutomovel(){
		if(editarVm.form.$valid){
			editarVm.erroForm = false;
			editarVm.salvo = false;
			editarVm.salvando = true;
			$http({
	            method: 'POST',
	            url: 'http://localhost:3000/api/automoveis/editar',
	            params: { id: $stateParams.id, placa: editarVm.placa, modelo: editarVm.modelo, ano: editarVm.ano, fabricante: editarVm.fabricante, capacidade: editarVm.capacidade, odometro: editarVm.odometro }
	        }).then(function(response){
	        	console.log(response);
	        	editarVm.salvando = false;
	        	editarVm.salvo = true;
	        });
		}else{
			editarVm.erroForm = true;
		}
	}
}