'use strict';
var Demo = {};
(function(Demo){

  var publicAPI = {
    init: init
  };

  $.extend(Demo, publicAPI);

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

  function animate() {
    requestAnimationFrame( animate );
    render();
  }

  function render() {

    if(Demo.Mouse.properties.isRightMB && INTERSECTED){
      INTERSECTED.rotation.y += ( targetRotationX - INTERSECTED.rotation.y ) * 0.1;

      finalRotationY = (targetRotationY - INTERSECTED.rotation.x);
      if (INTERSECTED.rotation.x  <= 1 && INTERSECTED.rotation.x >= -1 ) {

        INTERSECTED.rotation.x += finalRotationY * 0.1;
      }
      if (INTERSECTED.rotation.x  > 1 ) {

        INTERSECTED.rotation.x = 1
      }

      if (INTERSECTED.rotation.x  < -1 ) {
        INTERSECTED.rotation.x = -1
      }
    }
    Demo.Scenes.controls.update();
    Demo.Renderer.instance.render( Demo.Scenes.instance, Demo.Scenes.camera);
  }

})(Demo);