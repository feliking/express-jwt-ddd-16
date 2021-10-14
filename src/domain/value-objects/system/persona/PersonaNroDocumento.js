
'use strict';

const Text = require('../../general/Text');

class PersonaNroDocumento extends Text {
  constructor (value, errors) {
    super('nro_documento', value, { maxlength: 50 }, errors);
  }
}

module.exports = PersonaNroDocumento;
