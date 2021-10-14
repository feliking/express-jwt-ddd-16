'use strict';

const Text = require('../../general/Text');

class RolNombre extends Text {
  constructor (value, errors) {
    super('nombre', value, { required: true, maxlength: 50 }, errors);
  }
}

module.exports = RolNombre;
