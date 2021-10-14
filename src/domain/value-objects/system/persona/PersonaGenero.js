'use strict';

const Enum = require('../../general/Enum');

class PersonaGenero extends Enum {
  constructor (value, errors) {
    const values = ['M', 'F', 'OTRO'];
    super('genero', value, { values }, errors);
  }
}

module.exports = PersonaGenero;
