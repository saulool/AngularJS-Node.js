angular
.module('app.relatorios')
.controller('RelatorioAbastecimentosController', RelatorioAbastecimentosController);

RelatorioAbastecimentosController.$inject = ['$http'];

function RelatorioAbastecimentosController($http){
	var abastecimentosVm = this;
	getAbastecimentos();

	abastecimentosVm.abastecimentos = null;

	function getAbastecimentos(){
		$http(
        {
            method: 'GET',
            url: 'http://localhost:3000/api/abastecimentos'
        }).then(function(response){
        	console.log(response);

        	abastecimentosVm.abastecimentos = _.map(response.data, function(abastecimento){
        		return {
        			placa: abastecimento.placa,
        			modelo: abastecimento.modelo,
        			data: moment(abastecimento.data).format("DD/MM/YYYY"),
        			tipoCombustivel: abastecimento.tipo_combustivel,
        			valorOdometro: abastecimento.valor_odometro,
        			quantidadeLitros: abastecimento.quantidade_litros,
        			custoTotal: abastecimento.custo_total,
        			precoLitro: abastecimento.preco_litro
        		}
        	});

        	console.log(abastecimentosVm.abastecimentos);
        });
	}
}

angular.module('app.relatorios').filter('dateRange', function() {
    return function(records, from, to) {
    	if(from == null && to == null){
    		return records;
    	}else{
    		return records.filter(function(record) {
    			var data = moment(record.data, "DD/MM/YYYY").format();
    			console.log(record.data);
	            return record.data >= moment(from, "DD/MM/YYYY").format() && record.data <= moment(to, "DD/MM/YYYY").format();
	        });
    	}
    }
})