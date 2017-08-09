'use strict';

const colorSpace = {
  getYCrCbColor(color) {
    let R = color.r, G = color.g, B = color.b;

    let Y = 0.299 * R + 0.587 * G + 0.114 * B;
    let Cr = (R - Y) * 0.565 + 128;
    let Cb = (B - Y) * 0.713 + 128;

    return { Y, Cr, Cb };
  },

  getNormalizedColor(color) {
    let sum = color.r + color.g + color.b;
    return {
      r: color.r / sum,
      g: color.g / sum,
      b: color.b / sum
    };
  },

  getHSVColor(color) {
    let normalizedColor = colorSpace.getNormalizedColor(color);

    let maxVal = Math.max(normalizedColor.r, normalizedColor.g, normalizedColor.b);
    let minVal = Math.min(normalizedColor.r, normalizedColor.g, normalizedColor.b);

    let delta = maxVal - minVal;

    let H = getHue(normalizedColor, delta, maxVal);
    let S = maxVal === 0 ? 0 : delta / maxVal;
    let V = maxVal;

    return { H, S, V };
  }
}

function getHue(normalizedColor, delta, maxVal) {
  let R = normalizedColor.r;
  let G = normalizedColor.g;
  let B = normalizedColor.b;
  switch (maxVal.toFixed(2)) {
    case 0:
      return 0;
    case R.toFixed(2):
      return ((G - B) / delta) % 6 * 60;
    case G.toFixed(2):
      return (((B - R) / delta) + 2) * 60;
    case B.toFixed(2):
      return (((R - G) / delta) + 4) * 60;
    default:
      throw Error('Invalid value');
  }
}
