'use strict';

var CR_LOWER = 135;
var CR_UPPER = 180;
var CB_LOWER = 72;
var CB_UPPER = 135;
var Y_LOWER = 80;

var fixedYCrCb = {
  isSkinColor: function isSkinColor(color) {
    var YCrCbColor = colorSpace.getYCrCbColor(color);
    var isYBound = YCrCbColor.Y > Y_LOWER;
    var isCrBound = YCrCbColor.Cr > CR_LOWER && YCrCbColor.Cr < CR_UPPER;
    var isCbBound = YCrCbColor.Cb > CB_LOWER && YCrCbColor.Cb < CB_UPPER;

    return isYBound && isCrBound && isCbBound;
  }
};