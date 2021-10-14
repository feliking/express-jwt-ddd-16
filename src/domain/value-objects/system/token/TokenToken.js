'use strict';

const Text = require('../../general/Text');

class TokenToken extends Text {
  constructor (value, errors) {
    super('token', value, { required: true }, errors);
  }
}

module.exports = TokenToken;
