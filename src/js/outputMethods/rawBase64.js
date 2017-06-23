'use strict';

const rawBase64 = {
  outputImage: function outputImage(image, callback) {
    image.getBase64(Jimp.AUTO, callback);
  }
}
