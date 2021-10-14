'use strict';

const Enum = require('../../general/Enum');

class PersonaEstado extends Enum {
  constructor (value, errors) {
    const values = ['ACTIVO', 'INACTIVO'];
    super('estado', value, { required: true, values }, errors);
  }
}

module.exports = PersonaEstado;
