'use strict';

const Text = require('../../general/Text');

class PersonaSegundoApellido extends Text {
  constructor (value, errors) {
    super('segundo_apellido', value, { maxlength: 100 }, errors);
  }
}

module.exports = PersonaSegundoApellido;
