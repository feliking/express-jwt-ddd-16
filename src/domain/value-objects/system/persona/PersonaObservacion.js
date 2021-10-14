'use strict';

const Text = require('../../general/Text');

class PersonaObservacion extends Text {
  constructor (value, errors) {
    super('observacion', value, {}, errors);
  }
}

module.exports = PersonaObservacion;
