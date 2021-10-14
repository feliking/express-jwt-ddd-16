'use strict';

const Enum = require('../../general/Enum');

class AuthEstado extends Enum {
  constructor (value, errors) {
    const values = ['INICIO', 'ACTIVO', 'ELIMINADO'];
    super('estado', value, { required: true, values }, errors);
  }
}

module.exports = AuthEstado;
