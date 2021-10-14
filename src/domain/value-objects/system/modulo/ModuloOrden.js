'use strict';

const Integer = require('../../general/Integer');

class ModuloOrden extends Integer {
  constructor (value, errors) {
    super('orden', value, { required: true }, errors);
  }
}

module.exports = ModuloOrden;
