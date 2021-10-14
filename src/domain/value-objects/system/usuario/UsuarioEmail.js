'use strict';

const Email = require('../../general/Email');

class UsuarioEmail extends Email {
  constructor (value, errors) {
    super('email', value, {}, errors);
  }
}

module.exports = UsuarioEmail;
