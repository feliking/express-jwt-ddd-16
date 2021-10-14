'use strict';

const Text = require('../../general/Text');

class PersonaPrimerApellido extends Text {
  constructor (value, errors) {
    super('primer_apellido', value, { maxlength: 100 }, errors);
  }
}

module.exports = PersonaPrimerApellido;
