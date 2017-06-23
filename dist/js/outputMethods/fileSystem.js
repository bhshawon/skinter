'use strict';

var FILE_SYSTEM_QUOTA = 50 * 1024 * 1024;
window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
var fileSystemInstance = void 0;

var fileSystem = {
  outputImage: function outputImage(image, imageDom) {
    image.getBuffer(Jimp.AUTO, function (err, data) {
      if (err) {
        utils.errorHandler(err);
      } else {
        fileSystem.createFile(data, imageDom);
      }
    });
  },

  createFile: function createFile(buffer, imageDom) {
    if (!fileSystemInstance) {
      window.requestFileSystem(window.TEMPORARY, FILE_SYSTEM_QUOTA, function (fs) {
        fileSystemInstance = fs;
        processOutput(fileSystemInstance, buffer, imageDom);
      }, utils.errorHandler);
    } else {
      processOutput(fileSystemInstance, buffer, imageDom);
    }
  }
};

function processOutput(fileSystemInstance, buffer, imageDom) {
  var fileName = utils.getRandomString();
  fileSystemInstance.root.getFile(fileName, { create: true, exclusive: true }, function (fileEntry) {

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
    }, utils.errorHandler);
  }, utils.errorHandler);
}