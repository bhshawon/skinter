'use strict';

var RED_TO_GREEN_LOWER = 1.1;
var RED_TO_GREEN_UPPER = 1.85;
var RED_TO_BLUE_LOWER = 1.0;
var RED_TO_BLUE_UPPER = 5.0;

var fixedRGB = {
  isSkinColor: function isSkinColor(color) {
    var normalizedColor = colorSpace.getNormalizedColor(color);
    var redToGreen = normalizedColor.r / normalizedColor.g;
    var redToBlue = normalizedColor.r / normalizedColor.b;

    var isRedToGreenBound = redToGreen > RED_TO_GREEN_LOWER && redToGreen < RED_TO_GREEN_UPPER;
    var isRedToBlueBound = redToBlue > RED_TO_BLUE_LOWER && redToBlue < RED_TO_BLUE_UPPER;

    return isRedToGreenBound && isRedToBlueBound;
  }
};