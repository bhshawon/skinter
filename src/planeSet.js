/**
 * This file implements the C. Garcia and G. Tziritas plane set technique to detect skin color
 */
"use strict";

const planeSet = {
    isSkinColor: function isSkinColor(color, showLog) {
        let YCrCbColor = getYCrCbColor(color);
        let { Y, Cr, Cb } = YCrCbColor;
        let thetaSet = getThetaSet(YCrCbColor);
        let { theta1, theta2, theta3, theta4 } = thetaSet;

        let condition1 = Cr >= -2 * (Cb + 24);
        let condition2 = Cr >= -(Cb + 17);
        let condition3 = Cr >= -4 * (Cb + 32);
        let condition4 = Cr >= 2.5 * (Cb + theta1);
        let condition5 = Cr >= theta3;
        let condition6 = Cr >= (theta4 - Cb) / 2;
        let condition7 = Cr <= (220 - Cb) / 6;
        let condition8 = Cr <= 1.34 * (Cb - theta2);
        if(showLog)console.log(`1:${condition1} 2:${condition2} 3:${condition3} 4:${condition4} 5:${condition5} 6:${condition6} 7:${condition7} 8:${condition8}`);

        return condition1 && condition2 && condition3 && condition4 && condition5 && condition6 && condition7 && condition8;
    }
}

function getYCrCbColor(color) {
    let R = color.r, G = color.g, B = color.b;

    let Y = 0.299 * R + 0.587 * G + 0.114 * B;
    let Cr = (R - Y) * 0.565;
    let Cb = (B - Y) * 0.713;

    return { Y, Cr, Cb };
}

function getThetaSet(YCrCbColor) {
    let theta1, theta2, theta3, theta4;
    let { Y, Cr, Cb } = YCrCbColor;

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
        theta1,
        theta2,
        theta3,
        theta4
    }
}
