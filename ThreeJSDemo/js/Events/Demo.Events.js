'use strict';
Demo.Events = {};
(function(Demo){

  var publicAPI = {
    setRendererEvents : setRendererEvents,
    setUIEvents       : setUIEvents
  };

  $.extend(Demo.Events, publicAPI);

  function onDocumentMouseDown( event ) {
    event.preventDefault();

    // Here we will raise a flag to know if user is using the right button
    Demo.Mouse.setRightMouseButtonFlag(event);
    // This method will check if the mouse is clicking over any mesh object
    Demo.ObjectRotation.setIntersectors();

    if ( Demo.ObjectRotation.intersects.length > 0 ) {
      // We save the current state and selected object
      Demo.ObjectRotation.currentStateOnMouseDown();
      // When is right button, we calculate the amount of rotation needed
      if(Demo.Mouse.properties.isRightMB) rightMBDown();
    }
  }

  function onDocumentMouseMove( event ) {

    event.preventDefault();

    if(Demo.Mouse.properties.isRightMB){
      // We recalculate the mouse position to be able to modify the object rotation
      Demo.Mouse.rightButtonMovement();
    }else{
      // We update the picking ray with the camera and mouse position
      Demo.Mouse.leftButtonMovement();
      // When there is an object selected
      if ( Demo.ObjectRotation.selectedInstance ) {
        // Move the object's position
        Demo.ObjectRotation.intersects = Demo.ObjectRotation.raycaster.intersectObject( Demo.Scenes.plane );
        Demo.ObjectRotation.selectedInstance.position.copy( Demo.ObjectRotation.intersects[ 0 ].point.sub( Demo.ObjectRotation.offset ) );
        return;
      }

      // Reset the picking ray
      Demo.ObjectRotation.intersects = Demo.ObjectRotation.raycaster.intersectObjects( Demo.Scenes.objects );

      if ( Demo.ObjectRotation.intersects.length > 0 ) {
        // When the selected object is different from the first element of the picking ray
        if ( Demo.ObjectRotation.intersectedObject != Demo.ObjectRotation.intersects[ 0 ].object ) {
          // We select this new object
          Demo.ObjectRotation.intersectedObject = Demo.ObjectRotation.intersects[ 0 ].object;
          // Configure plane's position
          Demo.Scenes.plane.position.copy( Demo.ObjectRotation.intersectedObject.position );
          Demo.Scenes.plane.lookAt( Demo.Scenes.camera.position );
        }
        Demo.Scenes.container.style.cursor = 'pointer';
      } else {
        // Deselect object
        Demo.ObjectRotation.intersectedObject = null;
        Demo.Scenes.container.style.cursor = 'auto';
      }
    }
  }

  function onDocumentMouseUp( event ) {
    event.preventDefault();

    if (Demo.ObjectRotation.intersectedObject) {
      // When is left button we change the planes position
      if(!Demo.Mouse.properties.isRightMB){
        Demo.Scenes.plane.position.copy(Demo.ObjectRotation.intersectedObject.position);
      }
      Demo.Mouse.properties.isRightMB = false;
      Demo.ObjectRotation.selectedInstance = null;
      Demo.Scenes.controls.enabled = true;
    }
    Demo.Scenes.container.style.cursor = 'auto';
  }

  function onWindowResize() {
    Demo.Scenes.camera.aspect = window.innerWidth / window.innerHeight;
    Demo.Scenes.camera.updateProjectionMatrix();
    Demo.Renderer.instance.setSize( window.innerWidth, window.innerHeight );
  }

  function rightMBDown(){
    Demo.Mouse.properties.mouseXOnMouseDown = event.clientX - Demo.Scenes.windowHalfX;
    Demo.ObjectRotation.targetRotationOnMouseDownX = Demo.ObjectRotation.targetRotationX;

    Demo.Mouse.properties.mouseYOnMouseDown = event.clientY - Demo.Scenes.windowHalfY;
    Demo.ObjectRotation.targetRotationOnMouseDownY = Demo.ObjectRotation.targetRotationY;
  }

  function setUIEvents(){
    $('.dropdown-toggle').dropdown();
    $('#addSquareButton').click(Demo.Scenes.addSquare);
    $('#addCircumButton').click(Demo.Scenes.addCircum);

    window.addEventListener( 'resize', onWindowResize, false);
  }

  function setRendererEvents(){
    Demo.Renderer.instance.domElement.addEventListener( 'mousemove', onDocumentMouseMove, false );
    Demo.Renderer.instance.domElement.addEventListener( 'mousedown', onDocumentMouseDown, false );
    Demo.Renderer.instance.domElement.addEventListener( 'mouseup', onDocumentMouseUp, false );
    Demo.Renderer.instance.domElement.addEventListener("drop", Demo.FileUploader.onDocumentFileDrop, false);
    Demo.Renderer.instance.domElement.addEventListener( 'dragover', function(event){
      // HTML5 Drag&Drop Support requires this event listener to be defined like this
      event.preventDefault();
    },false);
  }

})(Demo);