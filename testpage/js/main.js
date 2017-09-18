$(document).ready(function(){
$('.owl-carousel').owlCarousel({
	loop:true,
	autoplay:true,
	smartSpeed:1000,
	items:1,
	nav: true,
    navText: ["<",">"]
});

$('a[href^="#"]').click(function(){
        var el = $(this).attr('href');
        $('body').animate({
            scrollTop: $(el).offset().top}, 1500);
        return false; 
});

});

