'use strict';

const Datetime = require('./Datetime');

class DateOnly extends Datetime {
  constructor (name, value, { required = false }, errors) {
    super(name, value, { required }, errors, true);
  }
}

module.exports = DateOnly;
