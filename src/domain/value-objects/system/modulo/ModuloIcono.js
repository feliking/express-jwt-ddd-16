'use strict';

const Text = require('../../general/Text');

class ModuloIcono extends Text {
  constructor (value, errors) {
    super('icono', value, { maxlength: 30 }, errors);
  }
}

module.exports = ModuloIcono;
