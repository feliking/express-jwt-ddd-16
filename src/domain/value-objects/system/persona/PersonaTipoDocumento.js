'use strict';

const Enum = require('../../general/Enum');

class PersonaTipoDocumento extends Enum {
  constructor (value, errors) {
    const values = ['CI', 'PASAPORTE', 'OTRO'];
    super('tipo_documento', value, { required: false, values }, errors);
  }
}

module.exports = PersonaTipoDocumento;
