'use strict';

const Text = require('../../general/Text');

class AuthState extends Text {
  constructor (value, errors) {
    super('state', value, { required: true, maxlength: 100 }, errors);
  }
}

module.exports = AuthState;
