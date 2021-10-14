'use strict';

const Bool = require('../../general/Bool');

class ArchivoEsImagen extends Bool {
  constructor (value, errors) {
    super('es_imagen', value, {}, errors);
  }
}

module.exports = ArchivoEsImagen;
