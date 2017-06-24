'use strict';

function processImage(elementDom) {
  let element = elementProvider.getElement(elementDom);
  let imageSource = element.getImageSource(elementDom);

  element.hideImage(elementDom);

  transformImage(imageSource, function (err, image) {
    if (!err) {
      outputMethod.outputImage(image, function (err, transformedImageSource) {
        element.revealTransformedImage(elementDom, transformedImageSource);
      })
    }
  })
}

function filterSkin(image) {
  let width = image.bitmap.width;
  let height = image.bitmap.height;

  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      let color = Jimp.intToRGBA(image.getPixelColor(i, j));

      if (detectionMethod.isSkinColor(color)) {
        image.setPixelColor(transformedSkinColor, i, j);
      }
    }
  }
}

function transformImage(source, callback) {
  Jimp.read(source, function (err, image) {
    if (err) {
      callback(err, null);
    } else {
      filterSkin(image);
      callback(null, image);
    }
  });
}

function setSource(imageDom, source) {
  imageDom.attr('src', source);
  imageDom.show();
}
