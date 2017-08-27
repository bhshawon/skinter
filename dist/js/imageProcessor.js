'use strict';

function processImage(elementDom) {
  var element = elementProvider.getElement(elementDom);
  var imageSource = element.getImageSource(elementDom);

  element.hideImage(elementDom);

  transformImage(imageSource, function (err, image) {
    if (!err) {
      outputMethod.outputImage(image, function (err, transformedImageSource) {
        element.revealTransformedImage(elementDom, transformedImageSource);
      });
    }
  });
}

function filterSkin(image) {
  var HORIZONTAL_COUNT = 50;
  var IGNORE_MARGIN = 0.3;
  var width = image.bitmap.width;
  var height = image.bitmap.height;

  var splitSquares = void 0;

  if (width <= HORIZONTAL_COUNT) {
    splitSquares = [{
      startWidth: 0,
      startHeight: 0,
      endWidth: width,
      endHeight: height
    }];
  } else {
    splitSquares = utils.splitRectIntoSquares(width, height, HORIZONTAL_COUNT);
  }

  var squarePixelCount = splitSquares[0].endWidth * splitSquares[0].endHeight;

  splitSquares.map(function (square) {
    var detectedPixels = [];
    for (var i = square.startWidth; i < square.endWidth; i++) {
      for (var j = square.startHeight; j < square.endHeight; j++) {
        var color = Jimp.intToRGBA(image.getPixelColor(i, j));

        if (detectionMethod.isSkinColor(color)) {
          detectedPixels.push([i, j]);
        }
      }
    }
    if (detectedPixels.length / squarePixelCount > IGNORE_MARGIN) {
      detectedPixels.map(function (pixel) {
        return image.setPixelColor(transformedSkinColor, pixel[0], pixel[1]);
      });
    }
  });
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