'use strict';

const Text = require('../../general/Text');

class EntidadNombre extends Text {
  constructor (value, errors) {
    super('usuario', value, { maxlength: 50 }, errors);
  }
}

module.exports = EntidadNombre;
