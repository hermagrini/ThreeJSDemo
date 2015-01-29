'use strict';
Demo.FileUploader = {};
(function(Demo){



  var publicAPI = {
    onDocumentFileDrop  : onDocumentFileDrop
  };

  $.extend(Demo.FileUploader, publicAPI);

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

  function loadFileCompleted(collada){
    var dae = collada.scene;
    dae.traverse( function ( child ) {
      if ( child instanceof THREE.SkinnedMesh ) {
        var animation = new THREE.Animation( child, child.geometry.animation );
        animation.play();
      }
    });
    dae.scale.x = dae.scale.y = dae.scale.z = 0.002;
    dae.updateMatrix();
    Demo.Scenes.instance.add(dae);
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

  function onDocumentFileDrop(evt) {
    var files = evt.dataTransfer.files;
    loadFile(files)
        .then(loadFileIntoCanvas)
        .then(loadFileCompleted);

    evt.preventDefault();
  }

})(Demo);