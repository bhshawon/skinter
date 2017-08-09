'use strict';

var HSV_MIN = 0;
var HSV_MAX = 50;
var SATURATION_MIN = 0.23;
var SATURATION_MAX = 0.68;

var fixedHSV = {
  isSkinColor: function isSkinColor(color) {
    var HSVColor = colorSpace.getHSVColor(color);
    var isHueBound = HSVColor.H > HSV_MIN && HSVColor.H < HSV_MAX;
    var isSaturationBound = HSVColor.S > SATURATION_MIN && HSVColor.S < SATURATION_MAX;
    return isHueBound && isSaturationBound;
  }
};