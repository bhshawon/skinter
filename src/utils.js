'use strict';

const utils = {
  errorHandler: function errorHandler(error) {
    console.log(error);
  },

  getRandomString: function getRandomString() {
    return (Math.PI * Math.random()).toString(36).substring(2);
  }
}
