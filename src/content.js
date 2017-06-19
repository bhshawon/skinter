'use strict';

console.log('Content script running');

// const fileSystemManager = new FileSystemManager();

$('img').hide();
$('img').removeAttr('srcset');
$(function () {
  $('img').each(function (i, elem) {
    let imageDom = $(this);
    let imageSrc = elem.src;
    imageDom.removeAttr('src');
    //imageDom.hide();
    Jimp.read(imageSrc, function (err, img) {
      if (!err) {
        filterSkin(img);

        img.getBase64(Jimp.AUTO, function (err, data) {
          if (err) {
            console.log(err);
          } else {
            imageDom.attr('src', data);
            imageDom.show();
            //fileSystemManager.createFile(data, imageDom);
          }
        });
      }
    });
  })
})

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


