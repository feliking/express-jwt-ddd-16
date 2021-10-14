'use strict';

const ValueObject = require('../ValueObject');

class Email extends ValueObject {
  constructor (name, value, { required = false }, errors) {
    super(name, value, { required }, errors);

    this.type = String;
    this.rules = {
      email: {
        message: 'no es un correo electrónico válido'
      },
      length: {
        maximum: 100,
        tooLong: 'debe tener a lo mucho %{count} caracteres'
      }
    };

    super.validate();
  }
}

module.exports = Email;
