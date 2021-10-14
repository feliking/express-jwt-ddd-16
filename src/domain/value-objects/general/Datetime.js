'use strict';

const ValueObject = require('../ValueObject');

class Datetime extends ValueObject {
  constructor (name, value, { required = false }, errors, dateOnly = false) {
    super(name, value, { required }, errors);

    this.type = String;
    this.rules = {
      datetime: {
        message: 'no es una fecha válida'
      }
    };

    if (dateOnly) {
      this.rules.datetime.dateOnly = dateOnly;
    }

    super.validate();
  }
}

module.exports = Datetime;
