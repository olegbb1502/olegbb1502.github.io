import _ from 'lodash';
import $ from 'jquery';
import {TweenMax, TimelineMax, TweenLite} from "gsap";

let container = document.querySelector("svg");
let robot = document.querySelector("#bb8");
let robotWithoutShadow = document.querySelector(".bb8-without-shadow");
let shadow = document.querySelector("#bb8-shadow")
var tl = new TimelineMax({delay:1});
let timeout;

function ready() {
    container.addEventListener("pointermove", function(e) {
        clearTimeout(timeout);
        positionRobot(e);
        robot.classList.add('move');
        timeout = setTimeout(function(){
            robot.classList.remove('move');
        }, 500);
    });

    robot.addEventListener("click", function () {
        robot.classList.add('jump');
        setTimeout(()=>{
            robot.classList.remove('jump');
        }, 500)
    });

    container.addEventListener('touchmove', function (e) {
        touches(e)
    }, true);
}

function positionRobot(e) {
    let relX = e.pageX - $('svg').width();
    if(relX<0){
        console.log("left")
        tl.from('#bb8-eyes', .3, {x: relX/2}, 0).from('#bb8-face', .3, {x: relX/2}, 0)
        tl.from('#bb8-body-2', .3, {rotation:relX/30, transformOrigin: "center"}, 0)
        // tl.from("#bb8-body", .3, {rotation:"15", repeat: -1}, {rotation: 0})
    }
    else{
        console.log("right")
        tl.from('#bb8-eyes', .3, {x: relX/4}, 0).from('#bb8-face', .3, {x: relX/4}, 0)
        tl.from('#bb8-body-2', .3, {rotation:-relX/50, transformOrigin: "center"}, 0)
        // tl.fromTo("#bb8-body", .3, {rotation:"-15", repeat: -1}, {rotation: 0})
    }
    tl.from(robot, 0.3, { x: relX}, 0);
}

function touches(e){
    console.log(e.changedTouches)
    let relX = e.changedTouches[0].clientX;
    if(relX<0){
        console.log("left")
        tl.from('#bb8-eyes', .3, {x: relX/2}, 0).from('#bb8-face', .3, {x: relX/2}, 0)
        tl.from('#bb8-body-2', .3, {rotation:relX/30, transformOrigin: "center"}, 0)
        // tl.from("#bb8-body", .3, {rotation:"15", repeat: -1}, {rotation: 0})
    }
    else{
        console.log("right")
        tl.from('#bb8-eyes', .3, {x: relX/4}, 0).from('#bb8-face', .3, {x: relX/4}, 0)
        tl.from('#bb8-body-2', .3, {rotation:-relX/50, transformOrigin: "center"}, 0)
        // tl.fromTo("#bb8-body", .3, {rotation:"-15", repeat: -1}, {rotation: 0})
    }
    tl.from(robot, 0.3, { x: relX}, 0);
}

$(document).ready(function () {

    // $("#bb8.intro").animate({
    //     transform: 'translate(100%, 20%) scale(.6)',
    // }, 300, function () {
    //     transform: 'translate(-80% -60%) scale(1.2)'
    // }, 300)
    tl.set(robot, {x:"120%", y:"20%", scale: .6})
        .from("#bb8-body-2", 0.5, { rotation: "+=15", transformOrigin: "center bottom", ease: Linear.easeNone, repeat: -1 }, 0)
        .to(robot, 3, {x:"-100%", y: "0%", scale: .6, ease: Circ.easeOut})
        .to(robot, 3, {x:"-90%", y: "-20%", scale: 1.6, ease: Circ.easeOut})
        .to('#bb8-eyes', 1, {x: 40})
        .to('#bb8-face', 1, {x: 40}, '-=1')
        .fromTo(".red-eye", .5, {autoAlpha:0.3, transformOrigin: "center"}, {autoAlpha:1,transformOrigin: "center" })
        .to(robot, 3, {x: "0%", y: "0%", scale: 1, ease: Circ.easeOut})
        .to("#bb8-body-2", 0.5, { rotation: "0", transformOrigin: "center bottom", ease: Linear.easeNone })
        .to(robot, 0.3,{className:"-=intro"});

    tl.fromTo(".red-eye", 2, {autoAlpha:0.3, transformOrigin: "center", delay:2}, {autoAlpha:1,transformOrigin: "center", repeat:-1 })
})

setTimeout(ready(), 2500)