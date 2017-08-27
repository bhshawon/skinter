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
  const HORIZONTAL_COUNT = 50;
  const IGNORE_MARGIN = 0.3;
  let width = image.bitmap.width;
  let height = image.bitmap.height;

  let splitSquares;

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

  let squarePixelCount = splitSquares[0].endWidth * splitSquares[0].endHeight;

  splitSquares.map(square => {
    let detectedPixels = [];
    for (let i = square.startWidth; i < square.endWidth; i++) {
      for (let j = square.startHeight; j < square.endHeight; j++) {
        let color = Jimp.intToRGBA(image.getPixelColor(i, j));

        if (detectionMethod.isSkinColor(color)) {
          detectedPixels.push([i, j]);
        }
      }
    }
    if (detectedPixels.length / squarePixelCount > IGNORE_MARGIN) {
      detectedPixels.map(pixel => image.setPixelColor(transformedSkinColor, pixel[0], pixel[1]));
    }
  })
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
