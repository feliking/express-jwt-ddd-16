'use strict';

const ValueObject = require('../../ValueObject');

class UsuarioContrasena extends ValueObject {
  constructor (value, errors) {
    super('contrasena', value, { required: true }, errors);
    const minimum = 8;
    this.type = String;
    this.rules = {
      length: {
        minimum,
        maximum: 100,
        tooShort: '^La contraseña necesita tener al menos %{count} caracteres',
        tooLong: '^La contraseña necesita tener a lo mucho %{count} caracteres'
      },
      format: {
        pattern: /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*-_])[\w!@#$%^&*-_]{8,}$/,
        flags: 'g',
        message: '^La contraseña debe tener al menos un dígito, una letra minúscula, una letra mayúscula y los siguientes caracteres: ! @ # $ % ^ & * - _'
      }
    };
    super.validate();
  }
}

module.exports = UsuarioContrasena;
