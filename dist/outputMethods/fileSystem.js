'use strict';

var FILE_SYSTEM_QUOTA = 2 * 1024 * 1024;
window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;

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
    window.requestFileSystem(window.TEMPORARY, FILE_SYSTEM_QUOTA, function (fs) {
      var fileName = utils.getRandomString();
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
        }, utils.errorHandler);
      }, utils.errorHandler);
    }, utils.errorHandler);
  }
};