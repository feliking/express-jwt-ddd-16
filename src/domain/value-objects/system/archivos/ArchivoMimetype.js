'use strict';

const Text = require('../../general/Text');

class ArchivoMimetype extends Text {
  constructor (value, errors) {
    super('mimetype', value, { maxlength: 100 }, errors);
  }
}

module.exports = ArchivoMimetype;
