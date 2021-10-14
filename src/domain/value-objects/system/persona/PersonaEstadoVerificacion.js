'use strict';

const Enum = require('../../general/Enum');

class PersonaEstadoVerificacion extends Enum {
  constructor (value, errors) {
    const values = ['VERIFICADO_SEGIP', 'OBSERVADO_SEGIP', 'NO_EXISTE_SEGIP', 'POR_VERIFICAR', 'VERIFICADO'];
    super('estado_verificacion', value, { values }, errors);
  }
}

module.exports = PersonaEstadoVerificacion;
