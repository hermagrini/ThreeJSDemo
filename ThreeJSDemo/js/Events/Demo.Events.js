'use strict';
Demo.Events = {};
(function(Demo){

  var publicAPI = {
    setRendererEvents: setRendererEvents,
    setUIEvents: setUIEvents
  };

  $.extend(Demo.Events, publicAPI);

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
    Demo.Renderer.instance.domElement.addEventListener( 'dragover', function(event){
      event.preventDefault();
    },false);
    Demo.Renderer.instance.domElement.addEventListener("drop", onDocumentFileDrop, false);
  }

  function onWindowResize() {
    Demo.Scenes.camera.aspect = window.innerWidth / window.innerHeight;
    Demo.Scenes.camera.updateProjectionMatrix();
    Demo.Renderer.instance.setSize( window.innerWidth, window.innerHeight );
  }

  function onDocumentMouseDown( event ) {
    event.preventDefault();


    if ("which" in event){
      Demo.Mouse.properties.isRightMB = event.which == 3;
    }
    else if ("button" in e){
      Demo.Mouse.properties.isRightMB = event.button == 2;
    }


    var vector = new THREE.Vector3( Demo.Mouse.instance.x, Demo.Mouse.instance.y, 0.5 ).unproject( Demo.Scenes.camera );
    var raycaster = new THREE.Raycaster( Demo.Scenes.camera.position, vector.sub( Demo.Scenes.camera.position ).normalize() );
    var intersects = raycaster.intersectObjects( Demo.Scenes.objects );

    if ( intersects.length > 0 ) {

      Demo.Scenes.controls.enabled = false;
      SELECTED = intersects[ 0 ].object;

      var intersects = raycaster.intersectObject( Demo.Scenes.plane );
      offset.copy( intersects[ 0 ].point ).sub( Demo.Scenes.plane.position );
      Demo.Scenes.container.style.cursor = 'move';
      if(Demo.Mouse.properties.isRightMB){
        rightMBDown();
      }
    }

  }

  function rightMBDown(){
    Demo.Mouse.properties.mouseXOnMouseDown = event.clientX - windowHalfX;
    targetRotationOnMouseDownX = targetRotationX;

    Demo.Mouse.properties.mouseYOnMouseDown = event.clientY - windowHalfY;
    targetRotationOnMouseDownY = targetRotationY;
  }

  function onDocumentMouseMove( event ) {

    event.preventDefault();

    if(Demo.Mouse.properties.isRightMB){
      Demo.Mouse.properties.mouseX = event.clientX - windowHalfX;
      Demo.Mouse.properties.mouseY = event.clientY - windowHalfY;

      targetRotationY = targetRotationOnMouseDownY + (Demo.Mouse.properties.mouseY - Demo.Mouse.properties.mouseYOnMouseDown) * 0.02;
      targetRotationX = targetRotationOnMouseDownX + (Demo.Mouse.properties.mouseX - Demo.Mouse.properties.mouseXOnMouseDown) * 0.02;
    }else{
      Demo.Mouse.instance.x = ( event.clientX / window.innerWidth ) * 2 - 1;
      Demo.Mouse.instance.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

      raycaster.setFromCamera( Demo.Mouse.instance, Demo.Scenes.camera );

      if ( SELECTED ) {

        var intersects = raycaster.intersectObject( Demo.Scenes.plane );
        SELECTED.position.copy( intersects[ 0 ].point.sub( offset ) );
        return;

      }

      var intersects = raycaster.intersectObjects( Demo.Scenes.objects );

      if ( intersects.length > 0 ) {

        if ( INTERSECTED != intersects[ 0 ].object ) {

          if ( INTERSECTED ) INTERSECTED.material.color.setHex( INTERSECTED.currentHex );

          INTERSECTED = intersects[ 0 ].object;
          INTERSECTED.currentHex = INTERSECTED.material.color.getHex();

          Demo.Scenes.plane.position.copy( INTERSECTED.position );
          Demo.Scenes.plane.lookAt( Demo.Scenes.camera.position );

        }

        Demo.Scenes.container.style.cursor = 'pointer';

      } else {

        if ( INTERSECTED ) INTERSECTED.material.color.setHex( INTERSECTED.currentHex );

        INTERSECTED = null;

        Demo.Scenes.container.style.cursor = 'auto';

      }
    }



  }

  function onDocumentMouseUp( event ) {
    event.preventDefault();

    if (INTERSECTED) {
      if(Demo.Mouse.properties.isRightMB && objectControls && objectControls.enabled){
        objectControls.enabled = false;
      }else{
        Demo.Scenes.plane.position.copy(INTERSECTED.position);
      }
      SELECTED = null;
      Demo.Mouse.properties.isRightMB = false;
      Demo.Scenes.controls.enabled = true;
    }
    Demo.Scenes.container.style.cursor = 'auto';
  }

  /*
    * FILEEEEE
   */
  function onDocumentFileDrop(evt) {

    var files = evt.dataTransfer.files;
    loadFile(files)
        .then(loadFileIntoCanvas)
        .then(loadFileCompleted);

    evt.preventDefault();
  }

  function loadFile(files){
    var deferred = Q.defer();
    if (files.length > 0) {
      var file = files[0];
      if (typeof FileReader !== "undefined") {
        var reader = new FileReader();
        // Note: addEventListener doesn't work in Google Chrome for this event
        reader.onload = function (evt) {
          deferred.resolve(evt.target.result);
        };
        reader.readAsText(file);
      }
    }else{
      deferred.reject(new Error('File not found'));
    }
    return deferred.promise;
  }

  function loadFileIntoCanvas(responseText){
    var deferred = Q.defer();
    var xmlParser = new DOMParser();
    var responseXML = xmlParser.parseFromString(responseText, "application/xml" );
    var loader = new THREE.ColladaLoader();
    loader.options.convertUpAxis = true;
    loader.parse(responseXML, function(collada){
      deferred.resolve(collada);
    });
    return deferred.promise;
  }

  function loadFileCompleted(collada){
    dae = collada.scene;
    dae.traverse( function ( child ) {
      if ( child instanceof THREE.SkinnedMesh ) {
        var animation = new THREE.Animation( child, child.geometry.animation );
        animation.play();
      }
    });
    dae.scale.x = dae.scale.y = dae.scale.z = 0.002;
    dae.updateMatrix();
    scene.add(dae);
  }


})(Demo);