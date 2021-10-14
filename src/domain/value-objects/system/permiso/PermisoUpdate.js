'use strict';

const Bool = require('../../general/Bool');

class PermisoUpdate extends Bool {
  constructor (value, errors) {
    super('update', value, { required: true }, errors);
  }
}

module.exports = PermisoUpdate;
