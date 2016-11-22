angular
.module('app.relatorios')
.controller('RelatorioAbastecimentosController', RelatorioAbastecimentosController);

RelatorioAbastecimentosController.$inject = ['$http'];

function RelatorioAbastecimentosController($http){
	var abastecimentosVm = this;
	getAbastecimentos();

	abastecimentosVm.abastecimentos = null;

	function getAbastecimentos(){
		$http({
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
    	if(from == null && to == null || from == "" && to == ""){
    		return records;
    	}else{
    		return records.filter(function(record) {
    			var data = moment(record.data, "DD/MM/YYYY").format();
    			console.log(data);

                if((from != null && from.length == 10) && (to != null && to.length == 10)){
                    var fromData = moment(from, "DD/MM/YYYY").format();
                    var toData = moment(to, "DD/MM/YYYY").format();

                    return data >= fromData && data <= toData; 
                }
                if(from != null && from.length == 10){
                    var fromData = moment(from, "DD/MM/YYYY").format();
                    return data >= moment(from, "DD/MM/YYYY").format();
                }
                if(to != null && to.length == 10){
                    var toData = moment(to, "DD/MM/YYYY").format();
                    return data <= moment(to, "DD/MM/YYYY").format();
                }

                if((to && to.length != 10) || (from && from.length != 10)){
                    return records;
                }
	        });
    	}
    }
})