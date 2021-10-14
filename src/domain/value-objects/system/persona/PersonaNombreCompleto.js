'use strict';

const Text = require('../../general/Text');

class PersonaNombreCompleto extends Text {
  constructor (value, errors) {
    super('nombre_completo', value, { maxlength: 255 }, errors);
  }
}

module.exports = PersonaNombreCompleto;
