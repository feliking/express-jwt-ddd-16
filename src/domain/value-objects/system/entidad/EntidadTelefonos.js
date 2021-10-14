'use strict';

const Text = require('../../general/Text');

class EntidadTelefonos extends Text {
  constructor (value, errors) {
    super('telefonos', value, { maxlength: 100 }, errors);
  }
}

module.exports = EntidadTelefonos;
