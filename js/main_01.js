$(function () {
	// EL DOM esta Listo
console.log('DOM Listo');

// INICIO Intervalos de los slider
var indicadores = $('.carousel-indicators');
indicadores.hide();


// Run this function once!
function slider() {
	//  Get time (interval) from each carousel-item
	var duration = $('div.carousel-inner')
		.find(".carousel-item.active")
		.data("interval");
	var t;
		clearTimeout(t);	
	$("#myCarousel").carousel('pause');
	// Control direction using 'next or 'prev'
	t = setTimeout("$('#myCarousel').carousel('next');", duration);	
	
	// BS Alert to show time to next slide, not needed
	var sec = (duration/1000); // show seconds, not milliseconds
	$("#time").html('Siguiente Slide en ' + sec + ' Segundos');
	$('#timed-alert').fadeIn(50).delay(2000).fadeOut(50);
	// End Alert

 console.log('Siguiente Slide en ' + sec +' Segundos');
}

slider();
// Run over and over...
$("#myCarousel").on("slid.bs.carousel", function() {
	// setTimeout MUST see milliseconds NOT seconds
	var duration = $(this)
		.find("div.carousel-item.active")
		.data("interval");
	var t;
		clearTimeout(t);
	$("#myCarousel").carousel('pause'); 
	// Control direction using 'next or 'prev'
	t = setTimeout("$('#myCarousel').carousel('next');", duration);

	$(".carousel-control-next").on("click", function() {
		clearTimeout(t);
		$('#timed-alert').hide();
	});

	$(".carousel-control-prev").on("click", function() {
		clearTimeout(t);
		$('#timed-alert').hide();
	});

	// BS Alert to show time to next slide, not needed
	var sec = (duration/1000); // show seconds, not milliseconds
	$("#time").html('Next slide in ' + sec + ' seconds');
	$('#timed-alert').fadeIn(50).delay(2000).fadeOut(50);
	// End Alert

	//	console.log('Next slide in ' + sec +' seconds');
	
});
// CIERRE Intervalos de los slider

//INICIO DE CAMBIO DE THEMES
var theme = $('#theme');
var green = $('#green');
var red   = $('#red');
var blue  = $('#blue');

green.css({
	cursor: 'pointer',
});

red.css({
	cursor: 'pointer',
});

blue.css({
	cursor: 'pointer',
});

green.click(function(event) {
	theme.attr('href','css/green.css');
});

red.click(function(event) {
	theme.attr({
		href: 'css/red.css'
	});
});

blue.click(function(event) {
	theme.attr({
		href: 'css/blue.css'
	});
});

//CIERRE DE CAMBIO DE THEMES


//SCROLL TOP CON ANIMATE
var up = $('.up');
up.hide();
up.click(function(event) {
	$('html,body').animate({
		scrollTop: 0},
		500, function() {
		console.log('Se realizo la animación')
	});
});

$(window).scroll(function (event) {
    var scroll = $(window).scrollTop();
    if(scroll >= 100){
    	up.fadeIn();
    }else{
    	up.fadeOut();
    }
});

// Login Falso con LocalStorage
$('#identificate form').submit(function() {
	var for_name = $('#name').val();
	localStorage.setItem('inputName', for_name );
	location.reload();
});

var nombreLocalStorage   = localStorage.getItem('inputName');
var buscador = $('#buscador');

if(nombreLocalStorage != null && nombreLocalStorage != 'undefined'){
	buscador.after('<ul class="navbar-nav align-items-center d-none d-md-flex"><li class="nav-item dropdown"><a class="nav-link pr-0" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"><div class="media align-items-center"><i class="far fa-user-circle fa-2x"></i><div class="media-body ml-2 d-none d-lg-block"><span class="mb-0 text-sm font-weight-bold">'+nombreLocalStorage+'</span></div></div></a><div class="dropdown-menu dropdown-menu-arrow dropdown-menu-right"><div class=" dropdown-header noti-title"><h6 class="text-overflow m-0">Welcome!</h6></div><a href="../examples/profile.html" class="dropdown-item"><i class="ni ni-single-02"></i><span>My profile</span></a><a href="../examples/profile.html" class="dropdown-item"><i class="ni ni-settings-gear-65"></i><span>Settings</span></a><a href="../examples/profile.html" class="dropdown-item"><i class="ni ni-calendar-grid-58"></i><span>Activity</span></a><a href="../examples/profile.html" class="dropdown-item"><i class="ni ni-support-16"></i><span>Support</span></a><div class="dropdown-divider"></div><a href="#!" class="dropdown-item" id="logout"><i class="ni ni-user-run"></i><span>Logout</span></a></div></li></ul>');

	$('#identificate').hide();
}

$('#logout').click(function(event) {
	localStorage.clear();
	location.reload();
});

// INICIO DE RELOJ
setInterval(function(){
	var reloj = moment().format('hh:mm:ss');
	$('#hora').html('<i class="far fa-clock mr-2"></i>'+reloj);
},1000)
// CIERRE DE RELOJ





});