'use strict';
Demo.Scenes = {};
(function(Demo){

  var instance = new THREE.Scene(),
      objects = [],
      container = document.getElementById('ThreeJS'),
      camera = {},
      controls = {},
      plane = {},
      windowHalfX = window.innerWidth / 2,
      windowHalfY = window.innerHeight / 2;

  var publicAPI = {
    addCircum     : addCircum,
    addSquare     : addSquare,
    camera        : camera,
    controls      : controls,
    container     : container,
    initCamera    : initCamera,
    initControls  : initControls,
    initGrid      : initGrid,
    initLights    : initLights,
    initPlane     : initPlane,
    instance      : instance,
    objects       : objects,
    plane         : plane,
    windowHalfX   : windowHalfX,
    windowHalfY   : windowHalfY
  };

  $.extend(Demo.Scenes, publicAPI);

  function addSquare(e){
    var geometry = new THREE.BoxGeometry(40, 40, 40);
    var object = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({color: Math.random() * 0xffffff }));
    object.position.set(Math.random() * 100, Math.random() * 100, Math.random() * 100);
    Demo.Scenes.instance.add( object );
    Demo.Scenes.objects.push( object );
  }

  function addCircum(e){
    var sphereGeometry = new THREE.SphereGeometry(40, 32, 16);
    var sphereMaterial = new THREE.MeshLambertMaterial({color: Math.random() * 0xffffff});
    var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(Math.random() * 100, Math.random() * 100, Math.random() * 100);
    Demo.Scenes.instance.add(sphere);
    Demo.Scenes.objects.push(sphere);
  }

  function initCamera(){
    Demo.Scenes.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
    Demo.Scenes.camera.position.set(0,150,400);
  }

  function initControls(){
    Demo.Scenes.controls = new THREE.TrackballControls( Demo.Scenes.camera );
    Demo.Scenes.controls.rotateSpeed = 1.0;
    Demo.Scenes.controls.zoomSpeed = 1.2;
    Demo.Scenes.controls.panSpeed = 0.8;
    Demo.Scenes.controls.noZoom = false;
    Demo.Scenes.controls.noPan = false;
    Demo.Scenes.controls.staticMoving = true;
    Demo.Scenes.controls.dynamicDampingFactor = 0.3;
  }

  function initGrid(){
    var gridXZ = new THREE.GridHelper(100, 10);
    gridXZ.setColors( new THREE.Color(0x006600), new THREE.Color(0x006600) );
    gridXZ.position.set( 0,0,0 );
    Demo.Scenes.instance.add(gridXZ);
  }

  function initLights(){
    Demo.Scenes.instance.add( new THREE.AmbientLight( 0x505050 ) );

    var light = new THREE.SpotLight( 0xffffff, 1.5 );
    light.position.set( 0, 500, 2000 );
    light.castShadow = true;

    light.shadowCameraNear = 200;
    light.shadowCameraFar = camera.far;
    light.shadowCameraFov = 50;

    light.shadowBias = -0.00022;
    light.shadowDarkness = 0.5;

    light.shadowMapWidth = 2048;
    light.shadowMapHeight = 2048;

    Demo.Scenes.instance.add( light );
  }

  function initPlane(){
    Demo.Scenes.plane = new THREE.Mesh(
        new THREE.PlaneBufferGeometry( 2000, 2000, 8, 8 ),
        new THREE.MeshBasicMaterial( { color: 0x000000, opacity: 0.25, transparent: true } )
    );
    Demo.Scenes.plane.visible = false;
    Demo.Scenes.instance.add( Demo.Scenes.plane );
  }

})(Demo);