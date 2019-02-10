$(document).ready(function(){
    function htmSlider(){
        var slideWrap = $('.slide-wrap');
        var nextLink = $('.next-slide');
        var prevLink = $('.prev-slide');
        var playLink = $('.auto');
        var is_animate = false;
        var slideWidth = $('.slide-item').outerWidth();
        var scrollSlider = slideWrap.position().left - slideWidth;

        nextLink.click(function(){
            if(!slideWrap.is(':animated')) {
                slideWrap.animate({left: scrollSlider}, 500, function(){
                    slideWrap
                        .find('.slide-item:first')
                        .appendTo(slideWrap)
                        .parent()
                        .css({'left': 0});
                });
            }
        });

        prevLink.click(function(){
            if(!slideWrap.is(':animated')) {
                slideWrap
                    .css({'left': scrollSlider})
                    .find('.slide-item:last')
                    .prependTo(slideWrap)
                    .parent()
                    .animate({left: 0}, 500);
            }
        });

        function autoplay(){
            if(!is_animate){
                is_animate = true;
                slideWrap.animate({left: scrollSlider}, 500, function(){
                    slideWrap
                        .find('.slide-item:first')
                        .appendTo(slideWrap)
                        .parent()
                        .css({'left': 0});
                    is_animate = false;
                });
            }
        }

        playLink.click(function(){
            if(playLink.hasClass('play')){
                playLink.removeClass('play').addClass('pause');
                $('.navy').addClass('disable');
                timer = setInterval(autoplay, 1000);
            } else {
                playLink.removeClass('pause').addClass('play');
                $('.navy').removeClass('disable');
                clearInterval(timer);
            }
        });

    }
    htmSlider();
});

function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {

        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

function showmenu(id, arrow){
    visible = document.getElementById(id).style.display;
    if(visible!='block') {
        document.getElementById(id).style.display = 'block';
        document.getElementById(arrow).style.transform = "rotate(180deg)";
    }
    else{
        document.getElementById(id).style.display='none';
        document.getElementById(arrow).style.transform = "rotate(360deg)";}

}


    window.onload = function what() {

        setInterval(function () {
            var width = document.documentElement.clientWidth;
            if(width<1405)
                document.getElementById("logo").innerHTML="SL";
            else
                document.getElementById("logo").innerHTML="SITE LOGO";
        }, 100);

    };
