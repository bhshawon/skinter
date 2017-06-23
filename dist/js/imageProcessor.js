'use strict';

function processImage(i, elem) {
  var elementDom = $(this);
  var element = elementProvider.getElement(elementDom);
  var imageSource = element.getImageSource(elementDom);

  element.hideImage(elementDom);

  transformImage(imageSource, function (err, img) {
    if (err) {
      console.error(err.stack || err);
    } else {
      outputMethod.outputImage(img, function (err, newSource) {
        element.setSource(imageDom, newSource);
      });
    }
  });
}

function filterSkin(img) {
  var width = img.bitmap.width;
  var height = img.bitmap.height;

  for (var i = 0; i < width; i++) {
    for (var j = 0; j < height; j++) {
      var color = Jimp.intToRGBA(img.getPixelColor(i, j));

      if (detectionMethod.isSkinColor(color)) {
        img.setPixelColor(transformedSkinColor, i, j);
      }
    }
  }
}

function transformImage(source, callback) {
  Jimp.read(source, function (err, img) {
    if (err) {
      callback(err, null);
    } else {
      filterSkin(img);
      callback(null, img);
    }
  });
}

function setSource(imageDom, source) {
  imageDom.attr('src', source);
  imageDom.show();
}