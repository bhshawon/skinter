/**
 * This file implements the C. Garcia and G. Tziritas plane set technique to detect skin color
 */
"use strict";

var planeSet = {
    isSkinColor: function isSkinColor(color, showLog) {
        var YCrCbColor = getYCrCbColor(color);
        var Y = YCrCbColor.Y,
            Cr = YCrCbColor.Cr,
            Cb = YCrCbColor.Cb;

        var thetaSet = getThetaSet(YCrCbColor);
        var theta1 = thetaSet.theta1,
            theta2 = thetaSet.theta2,
            theta3 = thetaSet.theta3,
            theta4 = thetaSet.theta4;


        var condition1 = Cr >= -2 * (Cb + 24);
        var condition2 = Cr >= -(Cb + 17);
        var condition3 = Cr >= -4 * (Cb + 32);
        var condition4 = Cr >= 2.5 * (Cb + theta1);
        var condition5 = Cr >= theta3;
        var condition6 = Cr >= (theta4 - Cb) / 2;
        var condition7 = Cr <= (220 - Cb) / 6;
        var condition8 = Cr <= 1.34 * (Cb - theta2);

        return condition1 && condition2 && condition3 && condition4 && condition5 && condition6 && condition7 && condition8;
    }
};

function getYCrCbColor(color) {
    var R = color.r,
        G = color.g,
        B = color.b;

    var Y = 0.299 * R + 0.587 * G + 0.114 * B;
    var Cr = (R - Y) * 0.565;
    var Cb = (B - Y) * 0.713;

    return { Y: Y, Cr: Cr, Cb: Cb };
}

function getThetaSet(YCrCbColor) {
    var theta1 = void 0,
        theta2 = void 0,
        theta3 = void 0,
        theta4 = void 0;
    var Y = YCrCbColor.Y,
        Cr = YCrCbColor.Cr,
        Cb = YCrCbColor.Cb;


    if (Y > 128) {
        theta1 = -2 + (256 - Y) / 16;
        theta2 = 20 - (256 - Y) / 16;
        theta3 = 6;
        theta4 = -8;
    } else {
        theta1 = 6;
        theta2 = 12;
        theta3 = 2 + Y / 32;
        theta4 = -16 + Y / 16;
    }

    return {
        theta1: theta1,
        theta2: theta2,
        theta3: theta3,
        theta4: theta4
    };
}