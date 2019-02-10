function someFunc(){
    var number = document.getElementById("numberOfPeople").value;
    var proector = document.getElementById("proector");
    var board = document.getElementById("whiteBoard");

    var room = document.getElementById('result');


    if(number <=8 && proector.checked && board.checked || number<=8 && proector.checked || number<=8 && board.checked || number<=8) room.innerHTML = 'Aztec';
    if(number<=6 && board.checked && !proector.checked || number<=6 && number>4) room.innerHTML = 'Navajo';
    if(number<=4 && !proector.checked && !board.checked) room.innerHTML = 'Cherokee';
    else room.innerHTML = 'Такой комнаты нет!';
}
document.getElementById("btn").onclick = someFunc;