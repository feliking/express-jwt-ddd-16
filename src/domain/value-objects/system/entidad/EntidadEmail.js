'use strict';

const Email = require('../../general/Email');

class EntidadEmail extends Email {
  constructor (value, errors) {
    super('email', value, { required: false }, errors);
  }
}

module.exports = EntidadEmail;
