'use strict';

console.log('Content script running');

// const fileSystemManager = new FileSystemManager();

$('img').hide();
$('img').removeAttr('srcset');
$(function () {
  $('img').each(function (i, elem) {
    var imageDom = $(this);
    var imageSrc = elem.src;
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
  });
});

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