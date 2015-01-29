'use strict';
Demo.ObjectRotation = {};
(function(Demo){

  var finalRotationY,
      intersects = [],
      intersectedObject,
      offset = new THREE.Vector3(),
      raycaster = new THREE.Raycaster(),
      selectedInstance,
      targetRotationX = 0,
      targetRotationOnMouseDownX = 0,
      targetRotationY = 0,
      targetRotationOnMouseDownY = 0,
      vector = {};

  var publicAPI = {
    currentStateOnMouseDown     : currentStateOnMouseDown,
    intersectedObject           : intersectedObject,
    intersects                  : intersects,
    offset                      : offset,
    raycaster                   : raycaster,
    selectedInstance            : selectedInstance,
    setIntersectors             : setIntersectors,
    targetRotationX             : targetRotationX,
    targetRotationOnMouseDownX  : targetRotationOnMouseDownX,
    targetRotationY             : targetRotationY,
    targetRotationOnMouseDownY  : targetRotationOnMouseDownY,
    vector                      : vector
  };

  $.extend(Demo.ObjectRotation, publicAPI);

  function currentStateOnMouseDown(){
    Demo.Scenes.controls.enabled = false;
    Demo.Scenes.container.style.cursor = 'move';
    Demo.ObjectRotation.selectedInstance = Demo.ObjectRotation.intersects[ 0 ].object;
    Demo.ObjectRotation.intersects = Demo.ObjectRotation.raycaster.intersectObject( Demo.Scenes.plane );
    Demo.ObjectRotation.offset.copy( Demo.ObjectRotation.intersects[ 0 ].point ).sub( Demo.Scenes.plane.position );
  }

  function setIntersectors(){
    Demo.ObjectRotation.vector = new THREE.Vector3( Demo.Mouse.instance.x, Demo.Mouse.instance.y, 0.5 ).unproject( Demo.Scenes.camera );
    Demo.ObjectRotation.raycaster = new THREE.Raycaster( Demo.Scenes.camera.position, Demo.ObjectRotation.vector.sub( Demo.Scenes.camera.position ).normalize() );
    Demo.ObjectRotation.intersects = Demo.ObjectRotation.raycaster.intersectObjects( Demo.Scenes.objects );
  }

})(Demo);