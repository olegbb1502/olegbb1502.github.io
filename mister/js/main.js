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


$(document).ready(function() {

    $('a').hoverIntent(function() {
            $(this).removeClass('active');
            setTimeout(function(){
                $(this).addClass('temp');
            },500);
        },
        function() {
            $(this).addClass('active');
            $(this).removeClass('temp');
        }
    );

});