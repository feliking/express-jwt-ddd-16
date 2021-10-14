'use strict';

const Text = require('../../general/Text');

class ConstanteCodigo extends Text {
  constructor (value, errors) {
    super('codigo', value, { required: true, maxlength: 20 }, errors);
  }
}

module.exports = ConstanteCodigo;
