
'use strict';

const Text = require('../../general/Text');

class PersonaTipoDocumentoOtro extends Text {
  constructor (value, errors) {
    super('tipo_documento_otro', value, { maxlength: 50 }, errors);
  }
}

module.exports = PersonaTipoDocumentoOtro;
