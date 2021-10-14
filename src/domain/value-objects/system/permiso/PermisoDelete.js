'use strict';

const Bool = require('../../general/Bool');

class PermisoDeleete extends Bool {
  constructor (value, errors) {
    super('delete', value, { required: true }, errors);
  }
}

module.exports = PermisoDeleete;
