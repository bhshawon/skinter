'use strict';

const colorSpace = {
  getYCrCbColor: function getYCrCbColor(color) {
    let R = color.r, G = color.g, B = color.b;

    let Y = 0.299 * R + 0.587 * G + 0.114 * B;
    let Cr = (R - Y) * 0.565 + 128;
    let Cb = (B - Y) * 0.713 + 128;

    return { Y, Cr, Cb };
  },

  getNormalizedColor: function getNormalizedColor(color) {
    let sum = color.r + color.g + color.b;
    return {
      r: color.r / sum,
      g: color.g / sum,
      b: color.b / sum
    };
  }
}

