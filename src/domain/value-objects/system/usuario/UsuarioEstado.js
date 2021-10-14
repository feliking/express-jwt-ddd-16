'use strict';

const Enum = require('../../general/Enum');

class UsuarioEstado extends Enum {
  constructor (value, errors) {
    const values = ['ACTIVO', 'INACTIVO', 'PENDIENTE', 'BLOQUEADO'];
    super('estado', value, { required: true, values }, errors);
  }
}

module.exports = UsuarioEstado;
