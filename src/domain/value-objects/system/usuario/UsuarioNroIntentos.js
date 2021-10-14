'use strict';

const Integer = require('../../general/Integer');

class UsuarioNroIntentos extends Integer {
  constructor (value, errors) {
    super('nro_intentos', value, { maxlength: 11 }, errors);
  }
}

module.exports = UsuarioNroIntentos;
