function sliderJS(t,a){var n=$(a).find("ul"),e=$(a).find("li[data-slide="+t+"]"),d=$(e).width();$(a).find("span").removeClass("on").end().find("span[data-slide="+t+"]").addClass("on"),$(n).animate({marginLeft:"-"+d*t},500)}$(document).ready(function(){$("a[href*=#]").on("click",function(t){var a=$(this);return $("html, body").stop().animate({scrollTop:$(a.attr("href")).offset().top},777),t.preventDefault(),!1})}),Chart.defaults.global.defaultFontSize=20,Chart.defaults.global.defaultFontColor="#fff",$(function(){new Chart(document.getElementById("sisAnal"),{type:"doughnut",data:{labels:["Математика","Українська мова та література","Фізика або Іноземна мова","Додаткові бали","Бал атестату"],datasets:[{label:"Population (millions)",backgroundColor:["#30a29a","#42536c","#f06358","#f7d33e","#44baca"],data:[.5,.2,.2,.05,.05]}]},options:{legend:{display:!1},title:{display:!0,text:"Системний аналіз",fontSize:50,fontColor:"#ffd300"}}})}),$(function(){new Chart(document.getElementById("compScience"),{type:"doughnut",data:{labels:["Математика","Українська мова та література","Фізика або Іноземна мова","Бал атестату"],datasets:[{backgroundColor:["#30a29a","#f06358","#44baca","#f7d33e"],data:[.5,.2,.25,.05]}]},options:{legend:{display:!1},title:{display:!0,text:"Комп'ютерні науки",fontSize:50,fontColor:"#ffd300"}}})}),$(document).ready(function(){$(".slider").each(function(){var t=!0,a=$(this),n=0,e=$(a).find("li").length;$(a).append("<div class='nav'></div>").find("li").each(function(){$(a).find(".nav").append("<span data-slide='"+$(this).index()+"'></span>"),$(this).attr("data-slide",$(this).index())}).end().find("span").first().addClass("on"),t&&(t=setInterval(function(){n>=4&&window.clearInterval(t);var d=$(a).find(".on").data("slide");sliderJS(d+1<e?d+1:0,a),n+=1},11e3))})}),$(document).on("click",".slider .nav span",function(t){t.preventDefault();var a=$(this).closest(".slider");sliderJS($(this).data("slide"),a)}),$("a.topLink").click(function(){return $("html, body").animate({scrollTop:$($(this).attr("href")).offset().top+"px"},{duration:500,easing:"swing"}),$(".modalwindow").fadeOut(1e3),!1});