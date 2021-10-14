'use strict';

const Text = require('../../general/Text');

class RolPath extends Text {
  constructor (value, errors) {
    super('path', value, { maxlength: 50 }, errors);
  }
}

module.exports = RolPath;
