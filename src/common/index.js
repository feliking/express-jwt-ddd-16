'use strict';

const i18n = require('./lib/i18n');
// const mail = require('./lib/mail');
const text = require('./lib/text');
const array = require('./lib/array');
const config = require('./config');
const errors = require('./lib/errors');
const object = require('./lib/object');
const sequelizeCrud = require('./lib/sequelize-crud');

module.exports = {
  i18n,
  errors,
  config,
  sequelizeCrud,
  // mail,
  text,
  array,
  object
};
