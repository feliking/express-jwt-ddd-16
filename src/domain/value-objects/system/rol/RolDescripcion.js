'use strict';

const Text = require('../../general/Text');

class RolDescripcion extends Text {
  constructor (value, errors) {
    super('descripcion', value, {}, errors);
  }
}

module.exports = RolDescripcion;
