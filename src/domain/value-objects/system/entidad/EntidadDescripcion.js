'use strict';

const Text = require('../../general/Text');

class EntidadDescripcion extends Text {
  constructor (value, errors) {
    super('descripcion', value, {}, errors);
  }
}

module.exports = EntidadDescripcion;
