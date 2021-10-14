'use strict';

const Text = require('../../general/Text');

class PersonaNombres extends Text {
  constructor (value, errors) {
    super('nombres', value, { required: true, maxlength: 100 }, errors);
  }
}

module.exports = PersonaNombres;
