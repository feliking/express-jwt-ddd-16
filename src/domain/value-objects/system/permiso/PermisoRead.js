'use strict';

const Bool = require('../../general/Bool');

class PermisoRead extends Bool {
  constructor (value, errors) {
    super('read', value, { required: true }, errors);
  }
}

module.exports = PermisoRead;
