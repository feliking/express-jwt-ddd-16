'use strict';

const Bool = require('../../general/Bool');

class ModuloVisible extends Bool {
  constructor (value, errors) {
    super('visible', value, { required: true }, errors);
  }
}

module.exports = ModuloVisible;
