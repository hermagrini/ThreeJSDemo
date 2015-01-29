'use strict';
var Demo = {};
(function(Demo){

  var publicAPI = {
    init  : init
  };

  $.extend(Demo, publicAPI);

  function animate() {
    requestAnimationFrame( animate );
    render();
  }

  function init() {

    Demo.Renderer.init();
    Demo.Scenes.initCamera();
    Demo.Scenes.initControls();
    Demo.Scenes.initLights();
    Demo.Scenes.initPlane();
    Demo.Scenes.initGrid();
    Demo.Scenes.addSquare();
    Demo.Mouse.init();
    Demo.Events.setUIEvents();
    Demo.Events.setRendererEvents();

    animate();
  }

  function render() {

    if(Demo.Mouse.properties.isRightMB && Demo.ObjectRotation.intersectedObject){
      Demo.ObjectRotation.intersectedObject.rotation.y += ( Demo.ObjectRotation.targetRotationX - Demo.ObjectRotation.intersectedObject.rotation.y ) * 0.1;

      Demo.ObjectRotation.finalRotationY = (Demo.ObjectRotation.targetRotationY - Demo.ObjectRotation.intersectedObject.rotation.x);
      if (Demo.ObjectRotation.intersectedObject.rotation.x  <= 1 && Demo.ObjectRotation.intersectedObject.rotation.x >= -1 ) {

        Demo.ObjectRotation.intersectedObject.rotation.x += Demo.ObjectRotation.finalRotationY * 0.1;
      }
      if (Demo.ObjectRotation.intersectedObject.rotation.x  > 1 ) {

        Demo.ObjectRotation.intersectedObject.rotation.x = 1
      }

      if (Demo.ObjectRotation.intersectedObject.rotation.x  < -1 ) {
        Demo.ObjectRotation.intersectedObject.rotation.x = -1
      }
    }
    Demo.Scenes.controls.update();
    Demo.Renderer.instance.render( Demo.Scenes.instance, Demo.Scenes.camera);
  }

})(Demo);