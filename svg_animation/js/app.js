var robotBody = document.querySelector('#bb8-body');
var robot = document.querySelector("#bb8");

robotBody.addEventListener("click", function(){
    robot.classList.add('jump');
    setTimeout(function(){
        robot.classList.remove('jump');
    }, 500)
})