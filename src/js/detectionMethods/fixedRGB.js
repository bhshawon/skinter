'use strict';

const RED_TO_GREEN_LOWER = 1.1;
const RED_TO_GREEN_UPPER = 1.85;
const RED_TO_BLUE_LOWER = 1.0;
const RED_TO_BLUE_UPPER = 5.0;

const fixedRGB = {
  isSkinColor: function isSkinColor(color) {
    const normalizedColor = colorSpace.getNormalizedColor(color);
    const redToGreen = normalizedColor.r / normalizedColor.g;
    const redToBlue = normalizedColor.r / normalizedColor.b;

    const isRedToGreenBound = redToGreen > RED_TO_GREEN_LOWER && redToGreen < RED_TO_GREEN_UPPER;
    const isRedToBlueBound = redToBlue > RED_TO_BLUE_LOWER && redToBlue < RED_TO_BLUE_UPPER;

    return isRedToGreenBound && isRedToBlueBound;
  }
}
