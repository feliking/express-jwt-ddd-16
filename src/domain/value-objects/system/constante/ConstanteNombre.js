'use strict';

const Text = require('../../general/Text');

class ConstanteNombre extends Text {
  constructor (value, errors) {
    super('nombre', value, { required: true, maxlength: 150 }, errors);
  }
}

module.exports = ConstanteNombre;
