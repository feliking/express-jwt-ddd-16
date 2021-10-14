'use strict';

const Decimal = require('../../general/Decimal');

class ArchivoSize extends Decimal {
  constructor (value, errors) {
    super('size', value, { maxlength: 11, required: true }, errors);
  }
}

module.exports = ArchivoSize;
