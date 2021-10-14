'use strict';

const Url = require('../../general/Url');

class EntidadWeb extends Url {
  constructor (value, errors) {
    super('web', value, { required: false }, errors);
  }
}

module.exports = EntidadWeb;
