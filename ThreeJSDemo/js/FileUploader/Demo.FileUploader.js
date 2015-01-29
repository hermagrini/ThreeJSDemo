'use strict';
Demo.FileUploader = {};
(function(Demo){



  var publicAPI = {
    onDocumentFileDrop  : onDocumentFileDrop
  };

  $.extend(Demo.FileUploader, publicAPI);

  function loadFile(files){
    // We create a promise
    var deferred = Q.defer();
    if (files.length > 0) {
      // Select only the first file
      var file = files[0];
      if (typeof FileReader !== "undefined") {
        var reader = new FileReader();
        // Note: addEventListener doesn't work in Google Chrome for this event
        reader.onload = function (evt) {
          // When the file is loaded we resolve the promise
          deferred.resolve(evt.target.result);
        };
        // We will read the file as text because ThreeJS's ColladaLoader has an XML parser
        // So we need to parse this string to XML
        reader.readAsText(file);
      }
    }else{
      deferred.reject(new Error('File not found'));
    }
    return deferred.promise;
  }

  function loadFileCompleted(collada){
    var dae = collada.scene;
    // We play animations if there is any
    dae.traverse( function ( child ) {
      if ( child instanceof THREE.SkinnedMesh ) {
        var animation = new THREE.Animation( child, child.geometry.animation );
        animation.play();
      }
    });
    dae.scale.x = dae.scale.y = dae.scale.z = 0.002;
    dae.updateMatrix();
    //We add the file to our Scene
    Demo.Scenes.instance.add(dae);
  }

  function loadFileIntoCanvas(responseText){
    var deferred = Q.defer();
    var xmlParser = new DOMParser();
    // We create the XML parser and take the file converted to text and parse it
    var responseXML = xmlParser.parseFromString(responseText, "application/xml" );
    // Create a new instance of Collada Files Loader
    var loader = new THREE.ColladaLoader();
    loader.options.convertUpAxis = true;
    // Parse the XML into ThreeJS object
    loader.parse(responseXML, function(collada){
      // Resolve the promise with the result
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