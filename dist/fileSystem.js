'use strict';

function FileSystemManager() {
  var QUOTA = 2 * 1024 * 1024;

  window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;

  this.createFile = function createFile(buffer, imageDom) {
    window.requestFileSystem(window.TEMPORARY, QUOTA, function (fs) {
      var fileName = getRandomString();
      fs.root.getFile(fileName, { create: true, exclusive: true }, function (fileEntry) {

        fileEntry.createWriter(function (fileWriter) {

          fileWriter.onwriteend = function (e) {
            console.log('Write completed.');
          };

          fileWriter.onerror = function (e) {
            console.log('Write failed: ' + e.toString());
          };

          var blob = new Blob([buffer]);
          fileWriter.write(blob);

          imageDom.attr('src', fileEntry.toURL());
          imageDom.show();
        }, errorHandler);
      }, errorHandler);
    }, errorHandler);
  };

  function errorHandler(error) {
    console.log(error);
  }

  function getRandomString() {
    return (Math.PI * Math.random()).toString(36).substring(2);
  }
}