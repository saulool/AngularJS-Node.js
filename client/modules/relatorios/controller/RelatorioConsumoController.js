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
        informacoesVm.totaisPorPlaca = [];
        $http({
            method: 'GET',
            url: 'http://localhost:3000/api/abastecimentos'
        }).then(function(response){
            informacoesVm.abastecimentos = response.data;

            var placas = _.map(informacoesVm.abastecimentos, function(abastecimento){
                return abastecimento.placa;
            });

            placas = _.uniq(placas);

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

                    console.log(abastecimentosPorMesPorPlaca);


                    //Para cada abastecimento de determinada placa
                    _.each(abastecimentosPorMesPorPlaca, function(abastecimentoPorMesPorPlaca){
                        var totalGasto = 0;

                        //Calcula o total gasto com os abastecimentos
                        _.each(abastecimentoPorMesPorPlaca.abastecimentos, function(abastecimento){
                            totalGasto += abastecimento.custo_total;
                        });

                        console.log(abastecimentoPorMesPorPlaca);


                        //Realiza as separações de séries
                        var cont = 0;
                        var posInicio = 0;
                        var series = [];
                        for(var i=0; i<abastecimentoPorMesPorPlaca.abastecimentos.length; i++){
                            //Se é uma nova série e não é o último abastecimento
                            if(abastecimentoPorMesPorPlaca.abastecimentos[i].nova_serie == 1 && i != abastecimentoPorMesPorPlaca.abastecimentos.length - 1){
                                var posInicioAux = posInicio;
                                posInicio = i;
                                if(cont != 0){
                                    series.push({ placa: abastecimentoPorMesPorPlaca.abastecimentos[posInicioAux].placa, abastecimentos: abastecimentoPorMesPorPlaca.abastecimentos.slice(posInicioAux, i)});
                                }
                                //Se é o último abastecimento
                            }else if(i == abastecimentoPorMesPorPlaca.abastecimentos.length - 1){
                                //Se o último não é uma nova série
                                if(abastecimentoPorMesPorPlaca.abastecimentos[i].nova_serie == 0){
                                    series.push({ placa: abastecimentoPorMesPorPlaca.abastecimentos[posInicio].placa, abastecimentos: abastecimentoPorMesPorPlaca.abastecimentos.slice(posInicio, i+1)});
                                //Se o último é uma nova série, adiciona a série anterior e mais o último elemento
                                }else{
                                    var posInicioAux = posInicio;
                                    posInicio = i;
                                    
                                    if(posInicioAux != posInicio)
                                        series.push({ placa: abastecimentoPorMesPorPlaca.abastecimentos[posInicioAux].placa, abastecimentos: abastecimentoPorMesPorPlaca.abastecimentos.slice(posInicioAux, i)});
                                    //x.push({ placa: informacoesVm.abastecimentos[i].placa, abastecimentos: [informacoesVm.abastecimentos[i]]});
                                }
                                //Se não é uma nova série e não é o último abastecimento
                            }else{
                                cont++;
                            }
                        }

                        console.log(series);


                        //Para cada série
                        var abastecimentosComMedia = [];
                        _.each(series, function(veiculo){
                            var totalLitros = 0;
                            var totalValor = 0;

                            //Calcula a distancia
                            var distancia = veiculo.abastecimentos[veiculo.abastecimentos.length-1].valor_odometro - veiculo.abastecimentos[0].valor_odometro;


                            //Para cada abastecimento da série
                            _.each(veiculo.abastecimentos, function(abastecimento,index){
                                
                                //Se não deve contar o valor gasto no último abastecimento
                                if(index < veiculo.abastecimentos.length-1){
                                    totalValor += abastecimento.custo_total;
                                    totalLitros += abastecimento.quantidade_litros;
                                }
                            });
                            
                            //Adiciona os totais daquela série no abastecimentosComMedia
                            abastecimentosComMedia.push({
                                placa: veiculo.placa,
                                distancia: distancia,
                                totalLitros: totalLitros,
                                totalValor: totalValor
                            });
                        });

                        console.log(abastecimentosComMedia);

                        //Realiza as médias mapeando um novo objeto
                        var mediasPorPlaca = [];
                        _.each(placas, function(placa){
                            mediasPorPlaca.push({placa: placa, medias: _.chain(abastecimentosComMedia).filter(function(abastecimento){
                                return placa == abastecimento.placa;
                            }).map(function(abastecimento){
                                return {
                                    distancia: abastecimento.distancia,
                                    totalLitros: abastecimento.totalLitros,
                                    totalValor: abastecimento.totalValor,
                                    kmPorLitro: abastecimento.distancia / abastecimento.totalLitros
                                };
                            }).value()});
                        });

                        console.log(mediasPorPlaca);

                        //Realiza a média das médias
                        var totaisPorPlaca = _.map(mediasPorPlaca, function(mediaPorPlaca){
                            var totalValor = 0;
                            var distancia = 0;
                            var kmPorLitro = 0;
                            
                            _.each(mediaPorPlaca.medias, function(media){
                                if(media.distancia > 0){
                                    totalValor += media.totalValor;
                                    distancia += media.distancia;
                                    kmPorLitro += media.kmPorLitro
                                }
                            });

                            kmPorLitro = kmPorLitro / mediaPorPlaca.medias.length;
                            
                            return {
                                placa: mediaPorPlaca.placa,
                                totalValor: totalGasto,
                                distancia: distancia,
                                kmPorLitro: kmPorLitro,
                                mesAno: abastecimentoPorMesPorPlaca.mesAno
                            }
                        });

                        var adicionar = _.filter(totaisPorPlaca, function(totalPorPlaca){
                            return totalPorPlaca.placa == abastecimentoPorMesPorPlaca.placa;
                        });

                        console.log(adicionar);

                        informacoesVm.totaisPorPlaca.push(adicionar[0]);

                        console.log(informacoesVm.totaisPorPlaca);

                        informacoesVm.totaisPorPlaca = _.uniq(informacoesVm.totaisPorPlaca, function(item, key, id) { 
                            return item.mesAno + item.placa;
                        });
                    });
                });
            });
        });


    }
}