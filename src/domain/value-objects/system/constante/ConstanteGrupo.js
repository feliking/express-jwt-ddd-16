'use strict';

const Text = require('../../general/Text');

class ConstanteGrupo extends Text {
  constructor (value, errors) {
    super('grupo', value, { required: true, maxlength: 50 }, errors);
  }
}

module.exports = ConstanteGrupo;
