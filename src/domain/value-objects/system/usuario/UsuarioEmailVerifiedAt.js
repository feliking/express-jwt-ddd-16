
'use strict';

const Datetime = require('../../general/Datetime');

class UsuarioEmailVerifiedAt extends Datetime {
  constructor (value, errors) {
    super('email_verified_at', value, {}, errors);
  }
}

module.exports = UsuarioEmailVerifiedAt;
