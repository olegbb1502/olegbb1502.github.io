$(function () {
    var welcomeSect = $('.welcome-section'),
        enterButton = welcomeSect.find('.enter-button'),
        animation = $('.fly-in-text');
    
    setTimeout(function () {
           welcomeSect.removeClass('content-hidden');
           // animation.addClass('animation');
    }, 800);

    enterButton.on('click', function (e) {
        e.preventDefault();
        welcomeSect.addClass('content-hidden').fadeOut();
    });
});


var deadline='2018-02-22 20:15:00';

$('.countdown').downCount({
        date: deadline,
    },
    function(){
        // alert("Время истекло!");
    });



// $( ".glitch-img" ).mgGlitch({
//     glitch: true,
//     blend : false,
//     scale: false
// });
