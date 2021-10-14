'use strict';

const Text = require('../../general/Text');

class ModuloRuta extends Text {
  constructor (value, errors) {
    super('label', value, { maxlength: 50 }, errors);
  }
}

module.exports = ModuloRuta;
