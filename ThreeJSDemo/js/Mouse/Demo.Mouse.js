'use strict';
Demo.Mouse = {};
(function(Demo){

  var properties = {},
      instance = new THREE.Vector2();

  var publicAPI = {
    init: init,
    instance: instance,
    properties: properties
  };

  $.extend(Demo.Mouse, publicAPI);

  function init(){
    Demo.Mouse.properties.mouseX = 0;
    Demo.Mouse.properties.mouseXOnMouseDown = 0;

    Demo.Mouse.properties.mouseY = 0;
    Demo.Mouse.properties.mouseYOnMouseDown = 0;

    Demo.Mouse.properties.isRightMB = false;
  }

})(Demo);