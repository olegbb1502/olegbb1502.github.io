
$(document).ready(function(){

   
var canvas = document.getElementById("canvas"), 
    context = canvas.getContext("2d");

 function draw(){
 	context.clearRect(0, 0, canvas.width, canvas.height);
			context.beginPath();

	            context.moveTo(175, 50);
	            context.lineTo(250, 50);
	            context.lineTo(175, 100);
	            context.lineTo(100, 100);
	            context.lineTo(175, 50);
	            context.strokeStyle = "black";
            	context.stroke();
            	context.fillStyle = "blue";
            	context.fill();
	        	context.closePath();

	        context.beginPath();
	            context.moveTo(50, 100);
	            context.lineTo(100, 100);
	            context.lineTo(100, 150);
	            context.lineTo(50, 150);
	            context.lineTo(50, 100);
	            context.strokeStyle = "black";
            	context.stroke();
            	context.fillStyle = "blue";
            	context.fill();	        
	        	context.closePath();

	        context.beginPath();
	            context.moveTo(100, 150);
	            context.lineTo(200, 250);
	            context.lineTo(100, 250);
	            context.lineTo(100, 150);
	            context.strokeStyle = "black";
            	context.stroke();
            	context.fillStyle = "blue";
            	context.fill();
	        	context.closePath();

	        context.beginPath();	        
	            context.moveTo(100, 250);
	            context.lineTo(75, 225);
	            context.lineTo(100, 200);
	            context.lineTo(100, 250);
	            context.strokeStyle = "black";
            	context.stroke();
            	context.fillStyle = "blue";
            	context.fill();
	        	context.closePath();

	        context.beginPath();	        
	            context.moveTo(100, 250);
	            context.lineTo(200, 250);
	            context.lineTo(200, 350);
	            context.lineTo(100, 250);
	            context.strokeStyle = "black";
            	context.stroke();
            	context.fillStyle = "blue";
            	context.fill();
	        	context.closePath();

	        context.beginPath();
	            context.moveTo(200, 350);
	            context.lineTo(100, 350);
	            context.lineTo(150, 300);
	            context.strokeStyle = "black";
            	context.stroke();
            	context.fillStyle = "blue";
            	context.fill();
	        	context.closePath();

	        context.beginPath();
	            context.moveTo(100, 350);
	            context.lineTo(100, 300);
	            context.lineTo(150, 300);
	            context.strokeStyle = "black";
            	context.stroke();
            	context.fillStyle = "blue";
            	context.fill();
 				context.closePath();


}
draw();

 $(document.body).on('keydown', function(e) {
    switch (e.which) {
        
        case 189:
            console.log('left  key pressed!');
            context.translate(-1,0);
            
           	// context.fillStyle = "yellow";
           	draw();
            break;
            

        
        case 187:
            console.log('right  key pressed!');
            context.translate(1,0);
            
            // context.fillStyle = "yellow";
            draw();
            break;
         default:
         // context.clearRect(0, 0, 300, 450);
         break;
    }

});

});