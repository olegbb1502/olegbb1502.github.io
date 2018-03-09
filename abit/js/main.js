$(document).ready(function(){
    $("a[href*=#]").on("click", function(e){
        var anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $(anchor.attr('href')).offset().top
        }, 777);
        e.preventDefault();
        return false;
    });
});

new Chart(document.getElementById("pie-chart1"), {
    type: 'pie',
    data: {
        labels: ["Математика", "Українська мова та література", "Фізика або Іноземна мова", "Додаткові бали", "ФДП"],
        datasets: [{
            backgroundColor: ["#5ebcbc", "#f87","#fd4","#27f","#77b"],
            data: [0.5,0.2,0.2,0.05,0.05]
        }]
    },
    options: {
        legend:{display:false}
    }
});

new Chart(document.getElementById("pie-chart2"), {
    type: 'pie',
    data: {
        labels: ["Математика", "Українська мова та література", "Фізика або Іноземна мова", "Додаткові бали America"],
        datasets: [{
            backgroundColor: ["#5ebcbc", "#f87","#fd4","#27f"],
            data: [0.5,0.2,0.25,0.05]
        }]
    },
    options: {
        legend:{display:false}
    }
});


$(document).ready(function() {
    $(".slider").each(function() {

        var repeats = 5,
            interval = 9,
            repeat = true,
            slider = $(this),
            repeatCount = 0,
            elements = $(slider).find("li").length;

        $(slider).append("<div class='nav'></div>").find("li").each(function() {
            $(slider).find(".nav").append("<span data-slide='"+$(this).index()+"'></span>");
            $(this).attr("data-slide", $(this).index());
        }).end().find("span").first().addClass("on");

        // add timeout

        if (repeat) {
            repeat = setInterval(function() {
                if (repeatCount >= repeats - 1) {
                    window.clearInterval(repeat);
                }

                var index = $(slider).find('.on').data("slide"),
                    nextIndex = index + 1 < elements ? index + 1 : 0;

                sliderJS(nextIndex, slider);

                repeatCount += 1;
            }, interval * 1000);
        }

    });
});

function sliderJS(index, slider) { // slide
    var ul = $(slider).find("ul"),
        bl = $(slider).find("li[data-slide=" + index + "]"),
        step = $(bl).width();

    $(slider)
        .find("span").removeClass("on")
        .end()
        .find("span[data-slide=" + index + "]").addClass("on");

    $(ul).animate({
        marginLeft: "-" + step * index
    }, 500);
}

$(document).on("click", ".slider .nav span", function(e) { // slider click navigate
    e.preventDefault();
    var slider = $(this).closest(".slider"),
        index = $(this).data("slide");

    sliderJS(index, slider);
});

$("a.topLink").click(function() {
    $("html, body").animate({
        scrollTop: $($(this).attr("href")).offset().top + "px"
    }, {
        duration: 500,
        easing: "swing"
    });
    $('.modalwindow').fadeOut(1000);
    return false;
});


