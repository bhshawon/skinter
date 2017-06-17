console.log('Content script running');
const RED_TO_GREEN_LOWER = 1.1;
const RED_TO_GREEN_HIGHER = 1.75;
// const RED_TO_BLUE_LOWER = 1.5;
// const RED_TO_BLUE_HIGHER = 4.0;
const CR_LOWER = 135;
const CR_UPPER = 180;
const CB_LOWER = 72;
const CB_UPPER = 135;
const Y_LOWER = 80;

$('img').hide();
$('img').removeAttr('srcset');
$(function () {
  $('img').each(function (i, elem) {
    let imageDom = $(this);
    let imageSrc = elem.src;
    imageDom.removeAttr('src');
    Jimp.read(imageSrc, function (err, img) {
      if (!err) {
        filterSkin(img);

        img.getBase64(Jimp.MIME_JPEG, function (err, data) {
          if (err) {
            console.log(err);
          } else {
            imageDom.attr('src', data);
          }
        })
        imageDom.show();
      }
    });
  })
})

function between(value, lowerBound, upperBound) {
  return (value > lowerBound && value < upperBound);
}

function isSkinColor(color) {
  const YCrCbColor = getYCrCbColor(color);
  const isYBound = YCrCbColor.Y > Y_LOWER;
  const isCrBound = YCrCbColor.Cr > CR_LOWER && YCrCbColor.Cr < CR_UPPER;
  const isCbBound = YCrCbColor.Cb > CB_LOWER && YCrCbColor.Cb < CB_UPPER;

  return (isYBound && isCrBound && isCbBound);
}

function getNormalizedColor(color) {
  let sum = color.r + color.g + color.b;
  return {
    r: color.r / sum,
    g: color.g / sum,
    b: color.b / sum
  };
}

function getYCrCbColor(color) {
  let R = color.r, G = color.g, B = color.b;

  let Y = 0.299 * R + 0.587 * G + 0.114 * B;
  let Cr = (R - Y) * 0.565 + 128;
  let Cb = (B - Y) * 0.713 + 128;

  //console.log({ Y, Cr, Cb });
  return { Y, Cr, Cb };
}

function filterSkin(img) {
  let width = img.bitmap.width;
  let height = img.bitmap.height;

  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      let color = Jimp.intToRGBA(img.getPixelColor(i, j));
      // let normalizedColor = getNormalizedColor(color);
      if (isSkinColor(color)) {
        img.setPixelColor(0xFFFFFFFF, i, j);
      }
    }
  }
}
