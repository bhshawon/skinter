'use strict';

console.log('Content script running');

// const fileSystemManager = new FileSystemManager();

$('img').hide();
$('img').removeAttr('srcset');
$(function () {
  $('img').each(processImage);
});

function processImage(i, elem) {
  var imageDom = $(this);
  var imageSrc = elem.src;
  imageDom.removeAttr('src');

  Jimp.read(imageSrc, function (err, img) {
    if (!err) {
      filterSkin(img);
      outputMethod.outputImage(img, imageDom);
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