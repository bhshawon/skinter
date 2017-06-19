'use strict';

const FILE_SYSTEM_QUOTA = 2 * 1024 * 1024;
window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;

const fileSystem = {
  outputImage: function outputImage(image, imageDom) {
    image.getBuffer(Jimp.AUTO, (err, data) => {
      if (err) {
        utils.errorHandler(err);
      } else {
        fileSystem.createFile(data, imageDom);
      }
    })
  },

  createFile: function createFile(buffer, imageDom) {
    window.requestFileSystem(window.TEMPORARY, FILE_SYSTEM_QUOTA, function (fs) {
      let fileName = utils.getRandomString();
      fs.root.getFile(fileName, { create: true, exclusive: true }, function (fileEntry) {

        fileEntry.createWriter(function (fileWriter) {

          fileWriter.onwriteend = function (e) {
            console.log('Write completed.');
          };

          fileWriter.onerror = function (e) {
            console.log('Write failed: ' + e.toString());
          };

          const blob = new Blob([buffer]);
          fileWriter.write(blob);

          imageDom.attr('src', fileEntry.toURL());
          imageDom.show();

        }, utils.errorHandler);

      }, utils.errorHandler);
    }, utils.errorHandler);
  }
}


