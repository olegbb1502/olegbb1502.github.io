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


var deadline='2018-02-25 20:15:00';

$('.countdown').downCount({
        date: deadline,
    },
    function(){
        // alert("Время истекло!");
    });

var lFollowX = 0,
    lFollowY = 0,
    x = 0,
    y = 0,
    friction = 1 / 30;

function moveBackground() {
    x += (lFollowX - x) * friction;
    y += (lFollowY - y) * friction;

    translate = 'translate(' + x + 'px, ' + y + 'px) scale(1.1)';

    $('.welcome-section').css({
        '-webit-transform': translate,
        '-moz-transform': translate,
        'transform': translate
    });

    window.requestAnimationFrame(moveBackground);
}

$(window).on('mousemove click', function(e) {

    var lMouseX = Math.max(-100, Math.min(100, $(window).width() / 2 - e.clientX));
    var lMouseY = Math.max(-100, Math.min(100, $(window).height() / 2 - e.clientY));
    lFollowX = (20 * lMouseX) / 100; // 100 : 12 = lMouxeX : lFollow
    lFollowY = (10 * lMouseY) / 100;

});

moveBackground();

// $( ".glitch-img" ).mgGlitch({
//     glitch: true,
//     blend : false,
//     scale: false
// });
