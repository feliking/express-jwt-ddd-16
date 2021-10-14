'use strict';

const ValueObject = require('../ValueObject');

class Enum extends ValueObject {
  constructor (name, value, { required = false, values = [] }, errors) {
    super(name, value, { required }, errors);

    this.type = String;
    this.rules = {
      inclusion: {
        within: values,
        message: 'no es un valor permitido'
      }
    };

    super.validate();
  }
}

module.exports = Enum;
