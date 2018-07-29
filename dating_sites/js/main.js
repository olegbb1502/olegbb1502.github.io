$(document).ready(function () {
    $('.like').on('click', function () {
        $('.dscr-like').addClass('show-an');
        setTimeout(function () {
            $('.dscr-like').removeClass('show-an');
        }, 1000);
    });


    $('.dislike').on('click', function () {
        $('.dscr-dislike').addClass('show-an');
        setTimeout(function () {
            $('.dscr-dislike').removeClass('show-an');
        }, 1000);
    });

    $('.description li').on('click', function () {
        $('#'+$(this).data('id')).show().siblings('div').hide();
    });

    $('.find').on('click', function () {
        var name = $('#name').val();
        var mail = $('#mail').val();
        var password = $('#password').val();
        if(name == '' && mail == '' && password == ''){
            $(this).css('background', '#d0182b');
            $('.successful').css('color', '#d0182b').html('Uncorrect data!');
            console.log('uncorrect');
        }
        else{
            $('.successful').css('color', '#009926').html('Successful!');
            $(this).css('background', '#009926');
        }


    })


    var show = false;

    $('.mobile-menu').on('click', function () {
        $(this).toggleClass('open');
        if(show == false){
            $('nav').fadeIn(500);
            show = true;
        }
        else{
            $('nav').fadeOut(500);
            show = false;
        }
    })

    $(window).scroll(function () {
        if ($(this).scrollTop() > 0) {
            $('#scroller').fadeIn();
        } else {
            $('#scroller').fadeOut();
        }
    });

    $('#scroller').click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 400);
        return false;
    });
});
