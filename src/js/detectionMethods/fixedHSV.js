'use strict';

const HSV_MIN = 0;
const HSV_MAX = 50;
const SATURATION_MIN = 0.23;
const SATURATION_MAX = 0.68;

const fixedHSV = {
  isSkinColor: function isSkinColor(color) {
    const HSVColor = colorSpace.getHSVColor(color);
    let isHueBound = HSVColor.H > HSV_MIN && HSVColor.H < HSV_MAX;
    let isSaturationBound = HSVColor.S > SATURATION_MIN && HSVColor.S < SATURATION_MAX;
    return isHueBound && isSaturationBound;
  }
}
