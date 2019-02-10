var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var geometry = new THREE.SphereGeometry( 1.2, 32, 32);
texture = new THREE.TextureLoader().load( "https://eoimages.gsfc.nasa.gov/images/imagerecords/57000/57730/land_ocean_ice_2048.jpg" );
material = new THREE.MeshBasicMaterial( { map: texture} );
// var roughnessMap = new THREE.TextureLoader().load("https://i.imgur.com/nI5Qx0l.jpg");
var sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);
//
// var geometry = new THREE.SphereGeometry( 1.2, 32, 32 );
// var material = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('https://eoimages.gsfc.nasa.gov/images/imagerecords/57000/57730/land_ocean_ice_2048.jpg',THREE.SphericalRefractionMapping) } );
// var sphere = new THREE.Mesh( geometry, material );
// scene.add( sphere );

var spotLightTop = new THREE.SpotLight( 0xffffff );
spotLightTop.position.set( 20, 50, 15 );
scene.add( spotLightTop );
//
// var spotLightBottom = new THREE.SpotLight( 0xffffff );
// spotLightBottom.position.set( -20, -50, -15 );
// scene.add( spotLightBottom );

camera.position.z = 4;
var mouse = {x:0,y:0};
var cameraMoves = {x:0,y:-0.001,z:-0.001,move:false,speed:0.002};
var rotate = false;

var move = function () {
    var key = document.addEventListener('keydown', function (e) {
        console.log(e.keyCode);
        switch (e.keyCode){
            case 104:
                sphere.position.y += 0.0001;
                sphere.rotation.y += 2;
                break;
            case 100:
                sphere.position.x-=0.0001;
                sphere.rotation.x -= 2;
                break;
            case 98:
                sphere.position.y -= 0.0001;
                sphere.rotation.y -= 2;
                break;
            case 102:
                sphere.position.x += 0.0001;
                sphere.rotation.x += 2;
                break;
            case 107:
                camera.position.z -= 0.0005;
                break;
            case 109:
                camera.position.z += 0.0005;
                break;
        }
    })
};
function mouseMove(e){



    if (e.clientX>mouse.x) { sphere.rotation.x += 0.02;} else { sphere.rotation.x -= 0.02;}
    if (e.clientY>mouse.y) { sphere.rotation.y -= 0.02; } else { sphere.rotation.y += 0.02;}

    mouse.x = e.clientX;
    mouse.y = e.clientY;

}
window.addEventListener('mousemove', mouseMove);

function change()
{
    if (rotate == false)
    {
        rotate = true;
    }
    else
    {
        rotate = false;
    }
}

var render = function () {
    // setInterval(render, 1000);
    requestAnimationFrame( render );
    move();
    if(rotate){
        sphere.rotation.y += 0.002;
    }
    // cube.rotation.x += 5;
    renderer.render(scene, camera);
};

render();