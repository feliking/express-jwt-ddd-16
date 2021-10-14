'use strict';

const debug = require('debug')('app:db');
require('dotenv').config();

const db = {
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  timezone: process.env.DB_TIMEZONE,
  logging: s => debug(s)
};

module.exports = db;
