'use strict';

console.log('Content script running');

// const fileSystemManager = new FileSystemManager();

$('img').hide();
$('img').removeAttr('srcset');
$(function () {
  $('img').each(processImage);
})

function processImage(i, elem) {
  let imageDom = $(this);
  let imageSrc = elem.src;
  imageDom.removeAttr('src');

  Jimp.read(imageSrc, function (err, img) {
    if (!err) {
      filterSkin(img);
      outputMethod.outputImage(img, imageDom);
    }
  });
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


