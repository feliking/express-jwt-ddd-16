'use strict';

const Text = require('../../general/Text');

class UsuarioToken extends Text {
  constructor (value, errors) {
    super('token', value, {}, errors);
  }
}

module.exports = UsuarioToken;
