'use strict';

const Integer = require('../../general/Integer');

class EntidadNit extends Integer {
  constructor (value, errors) {
    super('nit', value, { maxlength: 20 }, errors);
  }
}

module.exports = EntidadNit;
