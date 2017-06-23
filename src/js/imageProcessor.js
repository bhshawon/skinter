'use strict';

function processImage(i, elem) {
  let elementDom = $(this);
  let element = elementProvider.getElement(elementDom);
  let imageSource = element.getImageSource(elementDom);

  element.hideImage(elementDom);

  transformImage(imageSource, function (err, img) {
    if (err) {
      console.error(err.stack || err);
    } else {
      outputMethod.outputImage(img, function (err, newSource) {
        element.setSource(imageDom, newSource);
      })
    }
  })
}

function filterSkin(img) {
  let width = img.bitmap.width;
  let height = img.bitmap.height;

  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      let color = Jimp.intToRGBA(img.getPixelColor(i, j));

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
