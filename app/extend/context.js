'use strict';

const Etag = require('./etag');

// app/extend/context.js
module.exports = {
  get isIOS() {
    const iosReg = /iphone|ipad|ipod/i;
    return iosReg.test(this.get('user-agent'));
  },
  get Etag() {
    return Etag;
  },
};

