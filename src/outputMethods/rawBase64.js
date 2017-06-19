'use strict';

const rawBase64 = {
  outputImage: function outputImage(image, imageDom) {
    image.getBase64(Jimp.AUTO, (err, data) => {
      if (err) {
        errorHandler(err);
      } else {
        imageDom.attr('src', data);
        imageDom.show();
      }
    });
  }
}
