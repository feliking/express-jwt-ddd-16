'use strict';

const Text = require('../../general/Text');

class ArchivoPath extends Text {
  constructor (value, errors) {
    super('path', value, { required: true }, errors);
  }
}

module.exports = ArchivoPath;
