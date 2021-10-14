'use strict';

const Decimal = require('./Decimal');

class Integer extends Decimal {
  constructor (name, value, { required = false, maxlength = 11, minStrict, min, equal, maxStrict, max }, errors) {
    super(name, value, { required, maxlength, minStrict, min, equal, maxStrict, max }, errors, true);
  }
}

module.exports = Integer;
