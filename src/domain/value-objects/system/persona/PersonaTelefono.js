'use strict';

const Text = require('../../general/Text');

class PersonaTelefono extends Text {
  constructor (value, errors) {
    super('telefono', value, { maxlength: 50 }, errors);
  }
}

module.exports = PersonaTelefono;
