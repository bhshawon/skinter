'use strict';

var colorSpace = {
  getYCrCbColor: function getYCrCbColor(color) {
    var R = color.r,
        G = color.g,
        B = color.b;

    var Y = 0.299 * R + 0.587 * G + 0.114 * B;
    var Cr = (R - Y) * 0.565 + 128;
    var Cb = (B - Y) * 0.713 + 128;

    return { Y: Y, Cr: Cr, Cb: Cb };
  },
  getNormalizedColor: function getNormalizedColor(color) {
    var sum = color.r + color.g + color.b;
    return {
      r: color.r / sum,
      g: color.g / sum,
      b: color.b / sum
    };
  },
  getHSVColor: function getHSVColor(color) {
    var normalizedColor = colorSpace.getNormalizedColor(color);

    var maxVal = Math.max(normalizedColor.r, normalizedColor.g, normalizedColor.b);
    var minVal = Math.min(normalizedColor.r, normalizedColor.g, normalizedColor.b);

    var delta = maxVal - minVal;

    var H = getHue(normalizedColor, delta, maxVal);
    var S = maxVal === 0 ? 0 : delta / maxVal;
    var V = maxVal;

    return { H: H, S: S, V: V };
  }
};

function getHue(normalizedColor, delta, maxVal) {
  var R = normalizedColor.r;
  var G = normalizedColor.g;
  var B = normalizedColor.b;
  switch (maxVal.toFixed(2)) {
    case 0:
      return 0;
    case R.toFixed(2):
      return (G - B) / delta % 6 * 60;
    case G.toFixed(2):
      return ((B - R) / delta + 2) * 60;
    case B.toFixed(2):
      return ((R - G) / delta + 4) * 60;
    default:
      throw Error('Invalid value');
  }
}