
'use strict';

const Datetime = require('../../general/Datetime');

class UsuarioUltimoLogin extends Datetime {
  constructor (value, errors) {
    super('ultimo_login', value, {}, errors);
  }
}

module.exports = UsuarioUltimoLogin;
