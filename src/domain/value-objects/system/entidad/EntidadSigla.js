'use strict';

const Text = require('../../general/Text');

class EntidadSigla extends Text {
  constructor (value, errors) {
    super('sigla', value, { maxlength: 20 }, errors);
  }
}

module.exports = EntidadSigla;
