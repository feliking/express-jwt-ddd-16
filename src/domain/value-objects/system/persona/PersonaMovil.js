'use strict';

const Text = require('../../general/Text');

class PersonaMovil extends Text {
  constructor (value, errors) {
    super('movil', value, { maxlength: 50 }, errors);
  }
}

module.exports = PersonaMovil;
