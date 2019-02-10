// var location = window.location.href;
// var cur_url = '/' + location.split('/').pop();

$('.main-menu li').each(function () {
    var link = $(this).find('a').attr('href');

    if ("index.html" == link)
    {
        $(this).addClass('current');
    }
});