'use strict';
Demo.Renderer = {};
(function(Demo){

  var instance = {};

  var publicAPI = {
    init      : init,
    instance  : instance
  };

  $.extend(Demo.Renderer, publicAPI);

  function init(){
    Demo.Renderer.instance = new THREE.WebGLRenderer( { antialias: true } );
    Demo.Renderer.instance.setClearColor( 0xf0f0f0 );
    Demo.Renderer.instance.setSize( window.innerWidth, window.innerHeight );
    Demo.Renderer.instance.sortObjects = false;

    Demo.Renderer.instance.shadowMapEnabled = true;
    Demo.Renderer.instance.shadowMapType = THREE.PCFShadowMap;

    Demo.Scenes.container.appendChild( Demo.Renderer.instance.domElement );
  }


})(Demo);