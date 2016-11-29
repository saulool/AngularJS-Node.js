angular
.module('app')
.factory('AbastecimentoModel', AbastecimentoModel);

function AbastecimentoModel(){
	var AbastecimentoModel = function() {
        this.automovel = null;
        this.tipoCombustivel = 'gasolina';
        this.data = null;
        this.valorOdometro = null;
        this.qtdLitros = null;
        this.precoLitro = null;
        this.novaSerie = null;
    };

    return AbastecimentoModel;
}