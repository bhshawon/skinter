"use strict";let planeSet={isSkinColor:function(a,b){let c=getYCrCbColor(a),{Y:d,Cr:e,Cb:f}=c,g=getThetaSet(c),{theta1:h,theta2:i,theta3:j,theta4:k}=g,l=e>=-2*(f+24),m=e>=-(f+17),n=e>=-4*(f+32),o=e>=2.5*(f+h),p=e>=j,q=e>=(k-f)/2,r=e<=(220-f)/6,s=e<=1.34*(f-i);return b&&console.log(`1:${l} 2:${m} 3:${n} 4:${o} 5:${p} 6:${q} 7:${r} 8:${s}`),l&&m&&n&&o&&p&&q&&r&&s}};function getYCrCbColor(a){let b=a.r,c=a.g,d=a.b,e=0.299*b+0.587*c+0.114*d;return{Y:e,Cr:0.565*(b-e),Cb:0.713*(d-e)}}function getThetaSet(a){let b,c,d,e,{Y:f,Cr:g,Cb:h}=a;return 128<f?(b=-2+(256-f)/16,c=20-(256-f)/16,d=6,e=-8):(b=6,c=12,d=2+f/32,e=-16+f/16),{theta1:b,theta2:c,theta3:d,theta4:e}}