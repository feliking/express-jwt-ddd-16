'use strict';

const ValueObject = require('../ValueObject');

class Bool extends ValueObject {
  constructor (name, value, { required = false }, errors) {
    super(name, value, { required }, errors);

    this.type = Boolean;
    this.rules = {
      inclusion: {
        within: [true, false],
        message: 'tiene que ser un valor true o false'
      }
    };

    super.validate();
  }
}

module.exports = Bool;
