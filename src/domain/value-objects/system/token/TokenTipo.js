'use strict';

const Enum = require('../../general/Enum');

class TokenTipo extends Enum {
  constructor (value, errors) {
    const values = ['USUARIO', 'OPERADOR', 'ENTIDAD'];
    super('tipo', value, { required: true, values }, errors);
  }
}

module.exports = TokenTipo;
