'use strict';

const Text = require('../../general/Text');

class EntidadCodigoPortal extends Text {
  constructor (value, errors) {
    super('codigo_portal', value, { maxlength: 20 }, errors);
  }
}

module.exports = EntidadCodigoPortal;
