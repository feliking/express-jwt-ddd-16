'use strict';

const Text = require('../../general/Text');

class PersonaPaisNacimiento extends Text {
  constructor (value, errors) {
    super('pais_nacimiento', value, { maxlength: 100 }, errors);
  }
}

module.exports = PersonaPaisNacimiento;
