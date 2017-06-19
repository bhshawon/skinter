'use strict';
const CR_LOWER = 135;
const CR_UPPER = 180;
const CB_LOWER = 72;
const CB_UPPER = 135;
const Y_LOWER = 80;

const fixedYCrCb = {
  isSkinColor: function isSkinColor(color) {
    const YCrCbColor = colorSpace.getYCrCbColor(color);
    const isYBound = YCrCbColor.Y > Y_LOWER;
    const isCrBound = YCrCbColor.Cr > CR_LOWER && YCrCbColor.Cr < CR_UPPER;
    const isCbBound = YCrCbColor.Cb > CB_LOWER && YCrCbColor.Cb < CB_UPPER;

    return (isYBound && isCrBound && isCbBound);
  }
}
