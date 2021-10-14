'use strict';

const Integer = require('../../general/Integer');

class ArchivoImgHeight extends Integer {
  constructor (value, errors) {
    super('img_height', value, { maxlength: 11 }, errors);
  }
}

module.exports = ArchivoImgHeight;
