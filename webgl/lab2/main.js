$(function () {
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
    camera.position.set( 0, 0, 100 );
    camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );

    var scene = new THREE.Scene();

    var geometry = new THREE.Geometry();

    geometry.vertices.push(
        new THREE.Vector3( -10,  10, 0 ),
        new THREE.Vector3( -10, -10, 0 ),
        new THREE.Vector3(  10, -10, 0 ),
    );
    geometry.faces.push( new THREE.Face3( 0, 1, 2 ));

    var material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );

    var mesh = new THREE.Mesh( geometry, material );
    mesh.drawMode = THREE.TrianglesDrawMode; //default

    scene.add( mesh );


    var material = new THREE.LineBasicMaterial( { color: 0xffffff } );
    var geo = new THREE.Geometry();
    geo.vertices.push(new THREE.Vector3(2, 0, 0) );
    geo.vertices.push(new THREE.Vector3(4, 3, 0) );
    geo.vertices.push(new THREE.Vector3(6, 0, 0) );
    geo.vertices.push(new THREE.Vector3(8, 2, 0) );
    geo.vertices.push(new THREE.Vector3(10, 0, 0) );
    geo.vertices.push(new THREE.Vector3(11, 3, 0) );
    geo.vertices.push(new THREE.Vector3(8, 2, 0) );
    geo.vertices.push(new THREE.Vector3(4, 3, 0) );
    geo.vertices.push(new THREE.Vector3(2, 0, 0) );
    geo.vertices.push(new THREE.Vector3(6, 0, 0) );
    geo.vertices.push(new THREE.Vector3(10, 0, 0) );
    var figure = new THREE.Line( geo, material );
    scene.add(figure);

    var material = new THREE.LineBasicMaterial( { color: 0xffffff } );
    var geo = new THREE.Geometry();
    geo.vertices.push(new THREE.Vector3(-25, 2, 0) );
    geo.vertices.push(new THREE.Vector3(-15, 8, 0) );
    geo.vertices.push(new THREE.Vector3(-11, -4, 0) );
    geo.vertices.push(new THREE.Vector3(-20, -3, 0) );
    geo.vertices.push(new THREE.Vector3(-25, 2, 0) );
    var figure2 = new THREE.Line( geo, material );
    scene.add(figure2);

    var starsGeometry = new THREE.Geometry();

    for ( var i = 0; i < 10000; i ++ ) {

        var star = new THREE.Vector3();
        star.x = THREE.Math.randFloatSpread( 2000 );
        star.y = THREE.Math.randFloatSpread( 2000 );
        star.z = 0

        starsGeometry.vertices.push( star );

    }

    var starsMaterial = new THREE.PointsMaterial( { color: 0x888888 } );

    var starField = new THREE.Points( starsGeometry, starsMaterial );

    scene.add( starField );
    $("#WebGL-output").append(renderer.domElement);
    renderer.render(scene, camera);
});