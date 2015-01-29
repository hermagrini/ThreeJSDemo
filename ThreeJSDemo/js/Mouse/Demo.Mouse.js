'use strict';
Demo.Mouse = {};
(function(Demo){

  var properties = {},
      instance = new THREE.Vector2();

  var publicAPI = {
    init                    : init,
    instance                : instance,
    leftButtonMovement      : leftButtonMovement,
    properties              : properties,
    rightButtonMovement     : rightButtonMovement,
    setRightMouseButtonFlag : setRightMouseButtonFlag
  };

  $.extend(Demo.Mouse, publicAPI);

  function init(){
    Demo.Mouse.properties.mouseX = 0;
    Demo.Mouse.properties.mouseXOnMouseDown = 0;

    Demo.Mouse.properties.mouseY = 0;
    Demo.Mouse.properties.mouseYOnMouseDown = 0;

    Demo.Mouse.properties.isRightMB = false;
  }

  function leftButtonMovement(){
    Demo.Mouse.instance.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    Demo.Mouse.instance.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    Demo.ObjectRotation.raycaster.setFromCamera( Demo.Mouse.instance, Demo.Scenes.camera );
  }

  function rightButtonMovement(){
    Demo.Mouse.properties.mouseX = event.clientX - Demo.Scenes.windowHalfX;
    Demo.Mouse.properties.mouseY = event.clientY - Demo.Scenes.windowHalfY;

    Demo.ObjectRotation.targetRotationY = Demo.ObjectRotation.targetRotationOnMouseDownY + (Demo.Mouse.properties.mouseY - Demo.Mouse.properties.mouseYOnMouseDown) * 0.02;
    Demo.ObjectRotation.targetRotationX = Demo.ObjectRotation.targetRotationOnMouseDownX + (Demo.Mouse.properties.mouseX - Demo.Mouse.properties.mouseXOnMouseDown) * 0.02;
  }

  function setRightMouseButtonFlag(event){
    if ("which" in event){
      Demo.Mouse.properties.isRightMB = event.which == 3;
    }
    else if ("button" in event){
      Demo.Mouse.properties.isRightMB = event.button == 2;
    }
  }

})(Demo);