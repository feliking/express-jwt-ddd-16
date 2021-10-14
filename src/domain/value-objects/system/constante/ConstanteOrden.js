'use strict';

const Integer = require('../../general/Integer');

class ConstanteOrden extends Integer {
  constructor (value, errors) {
    super('orden', value, { maxlength: 11 }, errors);
  }
}

module.exports = ConstanteOrden;
