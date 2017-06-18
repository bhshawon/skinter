'use strict';

console.log('Content script running');
var RED_TO_GREEN_LOWER = 1.1;
var RED_TO_GREEN_HIGHER = 1.75;
// const RED_TO_BLUE_LOWER = 1.5;
// const RED_TO_BLUE_HIGHER = 4.0;
var CR_LOWER = 135;
var CR_UPPER = 180;
var CB_LOWER = 72;
var CB_UPPER = 135;
var Y_LOWER = 80;

var fileSystemManager = new FileSystemManager();

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

function between(value, lowerBound, upperBound) {
  return value > lowerBound && value < upperBound;
}

function isSkinColor(color) {
  var YCrCbColor = getYCrCbColor(color);
  var isYBound = YCrCbColor.Y > Y_LOWER;
  var isCrBound = YCrCbColor.Cr > CR_LOWER && YCrCbColor.Cr < CR_UPPER;
  var isCbBound = YCrCbColor.Cb > CB_LOWER && YCrCbColor.Cb < CB_UPPER;

  return isYBound && isCrBound && isCbBound;
}

function getNormalizedColor(color) {
  var sum = color.r + color.g + color.b;
  return {
    r: color.r / sum,
    g: color.g / sum,
    b: color.b / sum
  };
}

function getYCrCbColor(color) {
  var R = color.r,
      G = color.g,
      B = color.b;

  var Y = 0.299 * R + 0.587 * G + 0.114 * B;
  var Cr = (R - Y) * 0.565 + 128;
  var Cb = (B - Y) * 0.713 + 128;

  //console.log({ Y, Cr, Cb });
  return { Y: Y, Cr: Cr, Cb: Cb };
}

function filterSkin(img) {
  var width = img.bitmap.width;
  var height = img.bitmap.height;

  for (var i = 0; i < width; i++) {
    for (var j = 0; j < height; j++) {
      var color = Jimp.intToRGBA(img.getPixelColor(i, j));
      // let normalizedColor = getNormalizedColor(color);
      if (isSkinColor(color)) {
        img.setPixelColor(0xFFFFFFFF, i, j);
      }
    }
  }
}