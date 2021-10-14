
'use strict';

const Datetime = require('../../general/Datetime');

class UsuarioFechaBloqueo extends Datetime {
  constructor (value, errors) {
    super('fecha_reseteo_pass', value, {}, errors);
  }
}

module.exports = UsuarioFechaBloqueo;
