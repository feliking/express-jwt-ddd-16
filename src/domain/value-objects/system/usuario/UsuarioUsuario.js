'use strict';

const ValueObject = require('../../ValueObject');

class UsuarioUsuario extends ValueObject {
  constructor (value, errors) {
    super('usuario', value, { required: true }, errors);

    this.type = String;
    this.rules = {
      length: {
        minimum: 3,
        maximum: 50,
        tooShort: '^El nombre de usuario debe tener al menos %{count} caracteres',
        tooLong: '^El nombre de usuario debe tener a lo mucho %{count} caracteres'
      },
      format: {
        pattern: '[a-z0-9]+',
        flags: 'i',
        message: '^El nombre de usuario solo puede contener letras y números'
      }
    };
    super.validate();
  }
}

module.exports = UsuarioUsuario;
