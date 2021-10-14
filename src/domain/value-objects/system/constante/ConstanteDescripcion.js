'use strict';

const Text = require('../../general/Text');

class ConstanteDescripcion extends Text {
  constructor (value, errors) {
    super('nombre', value, {}, errors);
  }
}

module.exports = ConstanteDescripcion;
