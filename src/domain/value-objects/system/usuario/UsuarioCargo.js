'use strict';

const Text = require('../../general/Text');

class UsuarioCargo extends Text {
  constructor (value, errors) {
    super('cargo', value, { required: false, maxlength: 100 }, errors);
  }
}

module.exports = UsuarioCargo;
