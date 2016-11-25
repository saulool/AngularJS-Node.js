angular
.module('app.automoveis')
.controller('InformacoesController', InformacoesController);

InformacoesController.$inject = ['$http'];

function InformacoesController($http){
	var informacoesVm = this;

	informacoesVm.abastecimentos = [];

	$http({
        method: 'GET',
        url: 'http://localhost:3000/api/abastecimentos/ultimos'
    }).then(function(response){
    	informacoesVm.abastecimentos = response.data;

    	var placas = _.map(informacoesVm.abastecimentos, function(abastecimento){
	    	return abastecimento.placa;
	    });

    	placas = _.uniq(placas);

	    console.log(placas);
    });










    /*var placas = ['ZZZ-0000', 'YYY-0000', 'XXX-0000'];
	var cont = 0;
	var posInicio = 0;
	var x = [];
	for(var i=0; i<abastecimentos.length; i++){
	    //Se é uma nova série e não é o último abastecimento
	    if(abastecimentos[i].novaSerie == 1 && i != abastecimentos.length - 1){
	        var posInicioAux = posInicio;
	        posInicio = i;      
	        if(cont != 0){
	            x.push({ placa: abastecimentos[posInicioAux].placa, abastecimentos: abastecimentos.slice(posInicioAux, i)});
	        }
	        //Se é o último abastecimento
	    }else if(i == abastecimentos.length - 1){
	        //Se o último não é uma nova série
	        if(abastecimentos[i].novaSerie == 0){
	            x.push({ placa: abastecimentos[posInicio].placa, abastecimentos: abastecimentos.slice(posInicio, i+1)});
	        //Se o último é uma nova série, adiciona a série anterior e mais o último elemento
	        }else{
	            var posInicioAux = posInicio;
	            posInicio = i;
	            
	            x.push({ placa: abastecimentos[posInicioAux].placa, abastecimentos: abastecimentos.slice(posInicioAux, i)});
	            x.push({ placa: abastecimentos[i].placa, abastecimentos: [abastecimentos[i]]});
	        }
	        //Se não é uma nova série e não é o último abastecimento
	    }else{
	        cont++;
	    }
	}
	var abastecimentosComMedia = [];
	_.each(x, function(veiculo){
	    var totalLitros = 0;
	    var totalValor = 0;
	    var distancia = veiculo.abastecimentos[veiculo.abastecimentos.length-1].valorOdometro - veiculo.abastecimentos[0].valorOdometro;
	    
	    _.each(veiculo.abastecimentos, function(abastecimento){
	        totalLitros += abastecimento.quantidadeLitros;
	        totalValor += abastecimento.valorTotal; 
	    });
	    
	    abastecimentosComMedia.push({
	        placa: veiculo.placa,
	        distancia: distancia,
	        totalLitros: totalLitros,
	        totalValor: totalValor
	    });
	});
	var mediasPorPlaca = [];
	_.each(placas, function(placa){
	    mediasPorPlaca.push({placa: placa, medias: _.chain(abastecimentosComMedia).filter(function(abastecimento){
	        return placa == abastecimento.placa;
	    }).map(function(abastecimento){
	        console.log(abastecimento);
	        return abastecimento;
	    }).value()});
	});
	var totaisPorPlaca = _.map(mediasPorPlaca, function(mediaPorPlaca){
	        
	    var totalLitros = 0;
	    var totalValor = 0;
	    var distancia = 0;
	    
	    _.each(mediaPorPlaca.medias, function(media){
	        console.log(media.distancia);
	        console.log(media.distancia > 0);
	        if(media.distancia > 0){
	            totalLitros += media.totalLitros;
	            totalValor += media.totalValor;
	            distancia += media.distancia;
	        }
	    });
	    
	    console.log(distancia);
	    
	    return {
	        placa: mediaPorPlaca.placa,
	        totalLitros: totalLitros,
	        totalValor: totalValor,
	        distancia: distancia
	    }
	});*/
}