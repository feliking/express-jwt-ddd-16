'use strict';

const Bool = require('../../general/Bool');

class PermisoCreate extends Bool {
  constructor (value, errors) {
    super('create', value, { required: true }, errors);
  }
}

module.exports = PermisoCreate;
