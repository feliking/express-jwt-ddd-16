'use strict';

const Bool = require('../../general/Bool');

class PermisoFirma extends Bool {
  constructor (value, errors) {
    super('firma', value, { required: true }, errors);
  }
}

module.exports = PermisoFirma;
