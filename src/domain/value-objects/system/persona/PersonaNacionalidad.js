'use strict';

const Text = require('../../general/Text');

class PersonaNacionalidad extends Text {
  constructor (value, errors) {
    super('nacionalidad', value, { maxlength: 100 }, errors);
  }
}

module.exports = PersonaNacionalidad;
