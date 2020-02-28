$(function () {
$.get('https://pokeapi.co/api/v2/pokemon',function(response) {
//Convertimos el Objeto JSON en un ARRAY
var arr = Object.values(response);
console.log(arr);
	// Luego recorremos por cada un elemento, podemos sacar la URL y EL NOMBRE
	arr[3].forEach((element, index) => {
		$.ajax({
			url: `${element.url}`,
			type: 'GET',
			dataType: 'json',
			complete: function(result){
		    	var modal 	    = $('.modal-content');
		    	var modalHeader = $('.modal-header');
		    	var botonCerrar = $('.close');
		    	var modalFooter = $('.modal-footer');
		    	var lista       = $('.list-group-item')
		    	var graficoCanvas     = $('.grafico');
		    	var botones = $('.botones');

		    	modal.css({
		    		background : 'rgba(0,0,0,0.8)',
		    		height: '800px',
		    		overflow:'hidden'
		    	})

		    	modalHeader.css({
		    		'border-bottom':'1px solid rgba(222, 226, 230, 0.31)'
		    	})

		    	botonCerrar.css({
		    		color : '#ffffff'
		    	})

		    	modalFooter.css({
		    		'border-top':'1px solid rgba(222, 226, 230, 0.31)'
		    	})

		    	lista.css({
		    		'background'   :'none',
		    		'border-bottom': '1px solid rgba(222, 226, 230, 0.31)'
		    	})

		    	graficoCanvas.css({
		    		display : 'flex'
		    	})

		    	botones.css({
		    		bottom : '0'
		    	})

		    }
		}).done(mostrarLoop)

		//Inicio de la funcion mostrar loop
		function mostrarLoop(data){
			const nombrePoket    = data.name;
			const numeroPoket    = data.order
			const imgPoketUno    = data.sprites.front_default;
			const imgPoketDos    = data.sprites.front_shiny;
			const imgPoketTres   = data.sprites.back_default;
			const imgPoketCuatro = data.sprites.back_shiny;
			const habilidades      = data.abilities[0].ability.name;
    		const pakimonWeight    = data.weight;
    		
			const contenedorPokemon = $('#posts');
			console.log('Nombre del Pokemon : '+nombrePoket+' Orden del Pokemon: '+numeroPoket);
			contenedorPokemon.append(`<div class="col-md-3"><a data-toggle="modal" data-target="#modal-${numeroPoket}"><article class="pokemonAtributos text-center"><img class="img-fluid" src="${imgPoketUno}"><h6 class="text-uppercase">${nombrePoket}</h6></article></a></div><div class="modal fade" id="modal-${numeroPoket}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true"><div class="modal-dialog modal-lg" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="exampleModalLongTitle">${nombrePoket}</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body"><div class="row"><div class="col-md-3"><img class="img-fluid" src="${imgPoketUno}"></div><div class="col-md-3"><img class="img-fluid" src="${imgPoketDos}"></div><div class="col-md-3"><img class="img-fluid" src="${imgPoketTres}"></div><div class="col-md-3"><img class="img-fluid" src="${imgPoketCuatro}"></div><hr></div><div class="row"><div class="col-md-12"><table class="table"><thead><tr><th class="text-center" scope="col"><span class="font-weight-bold text-uppercase text-white">Numero</span></th><th class="text-center" scope="col"><span class="font-weight-bold text-uppercase text-white">Peso</span></th><th class="text-center" scope="col"><span class="font-weight-bold text-uppercase text-white">Habilidades</span></th></tr></thead><tbody><tr><td class="text-white text-center">${numeroPoket}</td><td class="text-white text-center">${pakimonWeight}</td><td class="text-white text-center">${habilidades}</td></tr></tbody></table></div></div><div class="row"><div class="col-md-12"><div id="grafico-${numeroPoket}"></div></div></div></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button></div></div></div></div>`);	
				crearGraf(data);
		}
		//Cierre de la función loop

		function crearGraf(data){
			console.log('Maldito Grafio');
			const dataChart = data.stats;
			const numeroPoket    = data.order
			for(var i = 0; i < dataChart.length; i++){ // ciclos.
              dataChart[i].label = dataChart[i]['stat'].name;
              dataChart[i].y = dataChart[i]['base_stat'];

              console.log('dataChart Poderes '+dataChart[i]['stat'].name);
              console.log('dataChart Y '+dataChart[i]['base_stat']);
    		}
			var chart = new CanvasJS.Chart(`grafico-${numeroPoket}`, {
				 	backgroundColor: "transparent",
				 	// theme:'light1',
				 	width:750,
				 	height:400,
				    animationEnabled: true,
 					animationDuration: 5000,
				    title: {
				      // Base de estadistica
				      text: "Stats Base",
				      fontColor: "white"
				    },
				    // Eje Y, Valor
				    axisY: {
				      title: "Value",
				      includeZero: false,
				      fontColor: "white"
				    },
				    // Eje X, Título de la base
				    axisX: {
				      title: "Stats",
				      fontColor: "white"
				    },
				      legend : {
    				  fontColor: "white"
 					},
				    // Grafica tipo columna
				    data: [{
				      type: "pie",
				      showInLegend: true,
				      dataPoints: dataChart
				    }]
				});
				chart.render();
		}

	});//Cerramos el forEach
});

var loadMore  = $('#loadMore')
var loadClear = $('#clear')

loadMore.click(function(event) {
	event.preventDefault();
	var valueBotton = parseInt($('#loadMore').val());
	valueBotton = valueBotton+20;
	$('#loadMore').val(valueBotton)
	var restIncrement  = $('#loadMore').val();
	cargarMas(restIncrement);
});

loadClear.click(function(event) {
	event.preventDefault();
	$('.dData').empty();
});

    
function cargarMas(restIncrement){

$.get('https://pokeapi.co/api/v2/pokemon?offset='+restIncrement+'&limit=20',function(response) {
	//Convertimos el Objeto JSON en un ARRAY
	var arr = Object.values(response);
	console.log(arr);
		//Luego recorremos por cada un elemento, podemos sacar la URL y EL NOMBRE
		arr[3].forEach((element, index) => {

			$.ajax({
				url: `${element.url}`,
				type: 'GET',
				dataType: 'json',
				complete: function(result){
		    	var modal 	    = $('.modal-content');
		    	var modalHeader = $('.modal-header');
		    	var botonCerrar = $('.close');
		    	var modalFooter = $('.modal-footer');
		    	var lista       = $('.list-group-item')
		    	var graficoCanvas = $('.grafico');

		    	modal.css({
		    		background : 'rgba(0,0,0,0.8)',
		    		height: '800px',
		    		overflow:'hidden'
		    	})

		    	modalHeader.css({
		    		'border-bottom':'1px solid rgba(222, 226, 230, 0.31)'
		    	})

		    	botonCerrar.css({
		    		color : '#ffffff'
		    	})

		    	modalFooter.css({
		    		'border-top':'1px solid rgba(222, 226, 230, 0.31)'
		    	})

		    	lista.css({
		    		'background'   :'none',
		    		'border-bottom': '1px solid rgba(222, 226, 230, 0.31)'
		    	})

		    	graficoCanvas.css({
		    		display : 'flex'
		    	})
		    	
		    }
			}).done(mostrar)

			//Inicio de la funcion mostrar loop
			function mostrar(data){

				const nombrePoket    = data.name;
				const numeroPoket    = data.order
			    const imgPoketUno    = data.sprites.front_default;
				const imgPoketDos    = data.sprites.front_shiny;
				const imgPoketTres   = data.sprites.back_default;
			    const imgPoketCuatro = data.sprites.back_shiny;
			    const habilidades    = data.abilities[0].ability.name;
    			const pakimonWeight  = data.weight;
    			const dataChart 	 = data.stats;
			    const contenedorPokemon = $('#posts');

				console.log('Nombre del Pokemon : '+nombrePoket+' Orden del Pokemon: '+numeroPoket);

				for(var i = 0; i < dataChart.length; i++){ // ciclos.
	              dataChart[i].label = dataChart[i]['stat'].name;
	              dataChart[i].y = dataChart[i]['base_stat'];

	              console.log('dataChart Poderes '+dataChart[i]['stat'].name);
	              console.log('dataChart Y '+dataChart[i]['base_stat']);
        		}

				contenedorPokemon.append(`<div class="col-md-3 dData"><a data-toggle="modal" data-target="#modal-${numeroPoket}"><article class="pokemonAtributos text-center"><img class="img-fluid" src="${imgPoketUno}"><h6 class="text-uppercase">${nombrePoket}</h6></article></a></div><div class="modal fade" id="modal-${numeroPoket}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true"><div class="modal-dialog modal-lg" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="exampleModalLongTitle">${nombrePoket}</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body"><div class="row"><div class="col-md-3"><img class="img-fluid" src="${imgPoketUno}"></div><div class="col-md-3"><img class="img-fluid" src="${imgPoketDos}"></div><div class="col-md-3"><img class="img-fluid" src="${imgPoketTres}"></div><div class="col-md-3"><img class="img-fluid" src="${imgPoketCuatro}"></div><hr></div><div class="row"><div class="col-md-12"><table class="table"><thead><tr><th class="text-center" scope="col"><span class="font-weight-bold text-uppercase text-white">Numero</span></th><th class="text-center" scope="col"><span class="font-weight-bold text-uppercase text-white">Peso</span></th><th class="text-center" scope="col"><span class="font-weight-bold text-uppercase text-white">Habilidades</span></th></tr></thead><tbody><tr><td class="text-white text-center">${numeroPoket}</td><td class="text-white text-center">${pakimonWeight}</td><td class="text-white text-center">${habilidades}</td></tr></tbody></table></div></div><div class="row"><div class="col-md-12"><div id="grafico-${numeroPoket}"></div></div></div></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button></div></div></div></div>`);
					crearGraf(data);
			}
			//Cierre de la función loop

			function crearGraf(data){
				const dataChart   = data.stats;
				const numeroPoket = data.order

				for(var i = 0; i < dataChart.length; i++){ // ciclos.
	              dataChart[i].label = dataChart[i]['stat'].name;
	              dataChart[i].y = dataChart[i]['base_stat'];
	              console.log('dataChart Poderes '+dataChart[i]['stat'].name);
	              console.log('dataChart Y '+dataChart[i]['base_stat']);
	    		}

				var chart = new CanvasJS.Chart(`grafico-${numeroPoket}`, {
				 	backgroundColor: "transparent",
				 	// theme:'light1',
				 	width:750,
				 	height:400,
				    animationEnabled: true,
 					animationDuration: 5000,
				    title: {
				      // Base de estadistica
				      text: "Stats Base",
				      fontColor: "white"
				    },
				    // Eje Y, Valor
				    axisY: {
				      title: "Value",
				      includeZero: false,
				      fontColor: "white"
				    },
				    // Eje X, Título de la base
				    axisX: {
				      title: "Stats",
				      fontColor: "white"
				    },
				    legend : {
    				fontColor: "white"
 					},
				    // Grafica tipo columna
				    data: [{
				      type: "pie",
				      showInLegend: true,
				      dataPoints: dataChart
				    }]
				});
				chart.render();
		}

		});//Cerramos el forEach
});

}	

});