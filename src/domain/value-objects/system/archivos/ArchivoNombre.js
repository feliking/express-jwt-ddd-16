'use strict';

const Text = require('../../general/Text');

class ArchivoNombre extends Text {
  constructor (value, errors) {
    super('nombre', value, { maxlength: 255 }, errors);
  }
}

module.exports = ArchivoNombre;
