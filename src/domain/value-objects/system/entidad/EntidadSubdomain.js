'use strict';

const Text = require('../../general/Text');

class EntidadNombre extends Text {
  constructor (value, errors) {
    super('subdomain', value, { maxlength: 30 }, errors);
  }
}

module.exports = EntidadNombre;
