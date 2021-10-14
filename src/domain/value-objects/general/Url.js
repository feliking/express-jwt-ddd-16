'use strict';

const ValueObject = require('../ValueObject');

class Url extends ValueObject {
  constructor (name, value, { required = false }, errors) {
    super(name, value, { required }, errors);

    this.type = String;
    this.rules = {
      url: {
        message: 'no es una URL válida'
      },
      length: {
        maximum: 255,
        tooLong: 'debe tener a lo mucho %{count} caracteres'
      }
    };

    super.validate();
  }
}

module.exports = Url;
