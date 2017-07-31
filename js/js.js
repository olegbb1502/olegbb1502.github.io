
$(document).ready(function(){
	$('a[href^="#"]').click(function(){
        var el = $(this).attr('href');
        $('body').animate({
            scrollTop: $(el).offset().top}, 1000);
        return false; 
	});
});


$(document).ready(function(){
        $(window).scroll(function(){
            var bo = $("body").scrollTop();
            $('#hid').text(bo);
			if ( bo > 200 ) { $("#hid").css("display", "block"); } else { $("#hid").css("display", "none"); };
        })
    })

$(function(f){
    var element = f('#blfix');
    var element2 = f('#info');
    var element3 = f('#fH')
    f(window).scroll(function(){
        element['fade'+ (f(this).scrollTop() > 200 ? 'In': 'Out')](500);  
         element2['fade'+ (f(this).scrollTop() > 200 ? 'In': 'Out')](500);
        element3['fade'+ (f(this).scrollTop() > 100 ? 'In': 'Out')](500);          
    });
});
