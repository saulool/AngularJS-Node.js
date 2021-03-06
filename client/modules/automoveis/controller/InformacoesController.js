angular
.module('app.automoveis')
.controller('InformacoesController', InformacoesController);

InformacoesController.$inject = ['$http'];

function InformacoesController($http){
	var informacoesVm = this;

	informacoesVm.automoveis = [];
	informacoesVm.abastecimentos = [];
	informacoesVm.totaisPorPlaca = [];

	getAutomoveis();
	getUltimosAbastecimentos();

	function getAutomoveis(){
		
	}

	function getUltimosAbastecimentos(){
		$http(
        {
            method: 'GET',
            url: 'http://localhost:3000/api/automoveis'
        }).then(function(response){
        	informacoesVm.automoveis = _.map(response.data, function(automovel){
        		return {
        			id: automovel.id,
        			placa: automovel.placa
        		}
        	});

			$http({
		        method: 'GET',
		        url: 'http://localhost:3000/api/abastecimentos/ultimos'
		    }).then(function(response){
		    	informacoesVm.abastecimentos = response.data;

		    	var placas = _.map(informacoesVm.abastecimentos, function(abastecimento){
			    	return {
			    		id: abastecimento.id,
			    		placa: abastecimento.placa
			    	}
			    });

		    	placas = _.uniq(placas, function(item, key, id) { 
				    return item.id;
				});

		    	informacoesVm.totaisPorPlaca = getTotaisPorPlaca(placas);

		    	//informacoesVm.automoveis = _.filter(informacoesVm.automoveis, function(obj){ return !_.findWhere(informacoesVm.totaisPorPlaca, obj); });

		    	var diff = _.difference(_.pluck(informacoesVm.automoveis, "placa"), _.pluck(informacoesVm.totaisPorPlaca, "placa"));
				informacoesVm.automoveis = _.filter(informacoesVm.automoveis, function(obj) { return diff.indexOf(obj.placa) >= 0; });
		    });
        });
	}

    function getTotaisPorPlaca(placas){
    	var cont = 0;
		var posInicio = 0;
		var x = [];
		for(var i=0; i<informacoesVm.abastecimentos.length; i++){
		    //Se é uma nova série e não é o último abastecimento
		    if(informacoesVm.abastecimentos[i].nova_serie == 1 && i != informacoesVm.abastecimentos.length - 1){
		        var posInicioAux = posInicio;
		        posInicio = i;      
		        if(cont != 0){
		            x.push({ placa: informacoesVm.abastecimentos[posInicioAux].placa, abastecimentos: informacoesVm.abastecimentos.slice(posInicioAux, i)});
		        }
		        //Se é o último abastecimento
		    }else if(i == informacoesVm.abastecimentos.length - 1){
		        //Se o último não é uma nova série
		        if(informacoesVm.abastecimentos[i].nova_serie == 0){
		            x.push({ placa: informacoesVm.abastecimentos[posInicio].placa, abastecimentos: informacoesVm.abastecimentos.slice(posInicio, i+1)});
		        //Se o último é uma nova série, adiciona a série anterior e mais o último elemento
		        }else{
		            var posInicioAux = posInicio;
		            posInicio = i;
		            
		            x.push({ placa: informacoesVm.abastecimentos[posInicioAux].placa, abastecimentos: informacoesVm.abastecimentos.slice(posInicioAux, i)});
		            //x.push({ placa: informacoesVm.abastecimentos[i].placa, abastecimentos: [informacoesVm.abastecimentos[i]]});
		        }
		        //Se não é uma nova série e não é o último abastecimento
		    }else{
		        cont++;
		    }
		}

		console.log(x);

		var abastecimentosComMedia = [];
		_.each(x, function(veiculo){
		    var totalLitros = 0;
		    var totalValor = 0;
		    var distancia = veiculo.abastecimentos[veiculo.abastecimentos.length-1].valor_odometro - veiculo.abastecimentos[0].valor_odometro;
		    
		    _.each(veiculo.abastecimentos, function(abastecimento,index){
		        
		    	//Se não deve contar o valor gasto no último abastecimento
                if(index < veiculo.abastecimentos.length-1){
                    totalValor += abastecimento.custo_total;
                    totalLitros += abastecimento.quantidade_litros;
                }
		    });
		    
		    abastecimentosComMedia.push({
		        placa: veiculo.placa,
		        distancia: distancia,
		        totalLitros: totalLitros,
		        totalValor: totalValor
		    });
		});

		console.log(abastecimentosComMedia);

		var mediasPorPlaca = [];
		_.each(placas, function(placa){
		    mediasPorPlaca.push({id: placa.id, placa: placa.placa, medias: _.chain(abastecimentosComMedia).filter(function(abastecimento){
		        return placa.placa == abastecimento.placa;
		    }).map(function(abastecimento){
		        return {
		        	distancia: abastecimento.distancia,
		        	totalLitros: abastecimento.totalLitros,
		        	totalValor: abastecimento.totalValor,
		        	kmPorLitro: abastecimento.distancia / abastecimento.totalLitros,
		        	custoPorKm: abastecimento.totalValor / abastecimento.distancia,
		        	litrosPorKm: abastecimento.totalLitros / abastecimento.distancia
		        };
		    }).value()});
		});

		console.log(mediasPorPlaca);

		var totaisPorPlaca = _.map(mediasPorPlaca, function(mediaPorPlaca){
		        
		    var totalLitros = 0;
		    var totalValor = 0;
		    var distancia = 0;
		    var kmPorLitro = 0;
		    var custoPorKm = 0;
		    var litrosPorKm = 0;
		    
		    _.each(mediaPorPlaca.medias, function(media){
		        if(media.distancia > 0){
		            totalLitros += media.totalLitros;
		            totalValor += media.totalValor;
		            distancia += media.distancia;
		            kmPorLitro += media.kmPorLitro,
		            custoPorKm += media.custoPorKm,
		            litrosPorKm += media.litrosPorKm
		        }
		    });

		    kmPorLitro = kmPorLitro / mediaPorPlaca.medias.length;
            custoPorKm = custoPorKm / mediaPorPlaca.medias.length;
            litrosPorKm = litrosPorKm / mediaPorPlaca.medias.length;
		    
		    return {
		    	id: mediaPorPlaca.id,
		        placa: mediaPorPlaca.placa,
		        totalLitros: totalLitros,
		        totalValor: totalValor,
		        distancia: distancia,
		        kmPorLitro: kmPorLitro,
		        custoPorKm: custoPorKm,
		        litrosPorKm: litrosPorKm
		    }
		});

		console.log(totaisPorPlaca);

		return totaisPorPlaca;
    }
}