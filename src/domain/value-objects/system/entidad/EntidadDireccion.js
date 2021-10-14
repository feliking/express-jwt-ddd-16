'use strict';

const Text = require('../../general/Text');

class EntidadDireccion extends Text {
  constructor (value, errors) {
    super('direccion', value, {}, errors);
  }
}

module.exports = EntidadDireccion;
