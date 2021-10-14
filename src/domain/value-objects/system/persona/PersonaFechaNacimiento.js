
'use strict';

const DateOnly = require('../../general/DateOnly');

class PersonaFechaNacimiento extends DateOnly {
  constructor (value, errors) {
    super('fecha_nacimiento', value, {}, errors);
  }
}

module.exports = PersonaFechaNacimiento;
