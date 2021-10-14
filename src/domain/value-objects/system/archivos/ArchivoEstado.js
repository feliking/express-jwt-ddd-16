'use strict';

const Enum = require('../../general/Enum');

class ArchivoEstado extends Enum {
  constructor (value, errors) {
    const values = ['ACTIVO', 'INACTIVO', 'ELIMINADO'];
    super('estado', value, { values }, errors);
  }
}

module.exports = ArchivoEstado;
