angular
.module('app')
.factory('AutomovelModel', AutomovelModel);

function AutomovelModel(){
	var AutomovelModel = function() {
        this.placa = null;
        this.modelo = 'gasolina';
        this.ano = null;
        this.fabricante = null;
        this.capacidade = null;
        this.odometro = null;
    };

    return AutomovelModel;
}