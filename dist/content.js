console.log('Content script running');const RED_TO_GREEN_LOWER=1.1,RED_TO_GREEN_HIGHER=1.75,CR_LOWER=135,CR_UPPER=180,CB_LOWER=72,CB_UPPER=135,Y_LOWER=80;$('img').hide(),$('img').removeAttr('srcset'),$(function(){$('img').each(function(a,b){let c=$(this),d=b.src;c.removeAttr('src'),Jimp.read(d,function(a,b){a||(filterSkin(b),b.getBase64(Jimp.MIME_JPEG,function(a,b){a?console.log(a):c.attr('src',b)}),c.show())})})});function between(a,b,c){return a>b&&a<c}function isSkinColor(a){const b=getYCrCbColor(a),c=b.Y>Y_LOWER,d=b.Cr>CR_LOWER&&b.Cr<CR_UPPER,e=b.Cb>CB_LOWER&&b.Cb<CB_UPPER;return c&&d&&e}function getNormalizedColor(a){let b=a.r+a.g+a.b;return{r:a.r/b,g:a.g/b,b:a.b/b}}function getYCrCbColor(a){let b=a.r,c=a.g,d=a.b,e=0.299*b+0.587*c+0.114*d;return{Y:e,Cr:0.565*(b-e)+128,Cb:0.713*(d-e)+128}}function filterSkin(a){let b=a.bitmap.width,c=a.bitmap.height;for(let d=0;d<b;d++)for(let b,e=0;e<c;e++)b=Jimp.intToRGBA(a.getPixelColor(d,e)),isSkinColor(b)&&a.setPixelColor(4294967295,d,e)}