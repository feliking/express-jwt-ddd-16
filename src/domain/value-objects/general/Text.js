'use strict';

const ValueObject = require('../ValueObject');

class Text extends ValueObject {
  constructor (name, value, { required = false, maxlength = 0, pattern = null }, errors) {
    super(name, value, { required }, errors);

    this.type = String;
    this.rules = {};

    if (maxlength > 0) {
      this.rules.length = {
        maximum: maxlength,
        tooLong: 'debe tener a lo mucho %{count} caracteres'
      };
    }

    if (pattern) {
      this.rules.format = {
        pattern,
        flags: 'i',
        message: 'no tiene el formato correcto'
      };
    }

    super.validate();
  }
}

module.exports = Text;
