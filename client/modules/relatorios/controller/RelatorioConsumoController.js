angular
.module('app.relatorios')
.controller('RelatorioConsumoController', RelatorioConsumoController);

RelatorioConsumoController.$inject = ['$http'];

function RelatorioConsumoController($http){
	var informacoesVm = this;

    informacoesVm.abastecimentos = [];
    informacoesVm.totaisPorPlaca = [];

    getConsumos();

    function getConsumos(){
        $http({
            method: 'GET',
            url: 'http://localhost:3000/api/abastecimentos'
        }).then(function(response){
            informacoesVm.abastecimentos = response.data;

            var placas = _.map(informacoesVm.abastecimentos, function(abastecimento){
                return abastecimento.placa;
            });

            placas = _.uniq(placas);

            //informacoesVm.totaisPorPlaca = getTotaisPorPlaca(informacoesVm.abastecimentos, placas);

            getMesesAbastecimento(placas);
        });
    }

    function getMesesAbastecimento(placas){
        var abastecimentosPorMesPorPlaca = [];
        var mesAnosAbastecimentos;

        //Busca meses e anos de abastecimento
        $http({
            method: 'GET',
            url: 'http://localhost:3000/api/abastecimentos/mes'
        }).then(function(response){
            mesAnosAbastecimentos = response.data;

            //Para cada mes e ano...
            _.each(mesAnosAbastecimentos, function(mesAnoAbastecimento, index){
                //Procura os abastecimentos para aquela data
                $http({
                    method: 'GET',
                    url: 'http://localhost:3000/api/abastecimentos/pordata',
                    params: { mes: mesAnoAbastecimento.mes, ano: mesAnoAbastecimento.ano }
                }).then(function(response){
                    abastecimentos = response.data;

                    //Para cada placa seleciona os abastecimentos
                    _.each(placas, function(placa){
                        var abastecimentosPlaca = _.filter(abastecimentos, function(abastecimento){
                            return abastecimento.placa == placa;
                        });

                        if(abastecimentosPlaca.length > 0){
                            abastecimentosPorMesPorPlaca.push({
                                mesAno: mesAnoAbastecimento.mes + "/" + mesAnoAbastecimento.ano,
                                placa: placa,
                                abastecimentos: abastecimentosPlaca
                            });
                        }
                        
                    });

                    abastecimentosPorMesPorPlaca2 = [];

                    _.each(abastecimentosPorMesPorPlaca, function(abastecimentoPorMesPorPlaca){
                        var totalGasto = 0;

                        _.each(abastecimentoPorMesPorPlaca.abastecimentos, function(abastecimento){
                            totalGasto += abastecimento.custo_total;
                        });

                        var cont = 0;
                        var posInicio = 0;
                        var x = [];
                        for(var i=0; i<abastecimentoPorMesPorPlaca.abastecimentos.length; i++){
                            //Se é uma nova série e não é o último abastecimento
                            if(abastecimentoPorMesPorPlaca.abastecimentos[i].nova_serie == 1 && i != abastecimentoPorMesPorPlaca.abastecimentos.length - 1){
                                var posInicioAux = posInicio;
                                posInicio = i;      
                                if(cont != 0){
                                    x.push({ placa: abastecimentoPorMesPorPlaca.abastecimentos[posInicioAux].placa, abastecimentos: abastecimentoPorMesPorPlaca.abastecimentos.slice(posInicioAux, i)});
                                }
                                //Se é o último abastecimento
                            }else if(i == abastecimentoPorMesPorPlaca.abastecimentos.length - 1){
                                //Se o último não é uma nova série
                                if(abastecimentoPorMesPorPlaca.abastecimentos[i].nova_serie == 0){
                                    x.push({ placa: abastecimentoPorMesPorPlaca.abastecimentos[posInicio].placa, abastecimentos: abastecimentoPorMesPorPlaca.abastecimentos.slice(posInicio, i+1)});
                                //Se o último é uma nova série, adiciona a série anterior e mais o último elemento
                                }else{
                                    var posInicioAux = posInicio;
                                    posInicio = i;
                                    
                                    x.push({ placa: abastecimentoPorMesPorPlaca.abastecimentos[posInicioAux].placa, abastecimentos: abastecimentoPorMesPorPlaca.abastecimentos.slice(posInicioAux, i)});
                                    //x.push({ placa: informacoesVm.abastecimentos[i].placa, abastecimentos: [informacoesVm.abastecimentos[i]]});
                                }
                                //Se não é uma nova série e não é o último abastecimento
                            }else{
                                cont++;
                            }
                        }

                        distancia = 0;
                        totalLitros = 0;

                        _.each(x, function(veiculo){
                            if(veiculo.abastecimentos.length > 0){
                                distancia += veiculo.abastecimentos[veiculo.abastecimentos.length-1].valor_odometro - veiculo.abastecimentos[0].valor_odometro;

                                _.each(veiculo.abastecimentos, function(abastecimento, index){
                                    if(index < veiculo.abastecimentos.length-1)
                                        totalLitros += abastecimento.quantidade_litros;
                                });
                            }
                            
                        });

                        abastecimentosPorMesPorPlaca2.push({
                            mesAno: abastecimentoPorMesPorPlaca.mesAno,
                            placa: abastecimentoPorMesPorPlaca.placa,
                            totalGasto: totalGasto,
                            distancia: distancia,
                            totalLitros: totalLitros
                        });
                    });

                    informacoesVm.totaisPorPlaca = abastecimentosPorMesPorPlaca2;
                });
            });
        });


    }
}