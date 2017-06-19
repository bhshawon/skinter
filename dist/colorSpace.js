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
  }
};