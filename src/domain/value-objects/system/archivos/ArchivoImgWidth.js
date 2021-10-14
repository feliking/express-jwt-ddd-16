'use strict';

const Integer = require('../../general/Integer');

class ArchivoImgWidth extends Integer {
  constructor (value, errors) {
    super('img_width', value, { maxlength: 11 }, errors);
  }
}

module.exports = ArchivoImgWidth;
