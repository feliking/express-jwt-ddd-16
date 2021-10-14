'use strict';

const Text = require('../../general/Text');

class ArchivoFilename extends Text {
  constructor (value, errors) {
    super('filename', value, { required: true }, errors);
  }
}

module.exports = ArchivoFilename;
