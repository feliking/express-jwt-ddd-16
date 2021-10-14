'use strict';

const db = require('./db');
const mail = require('./mail');
const auth = require('./auth');
const openid = require('./openid');
const logs = require('./logs');

module.exports = {
  db,
  mail,
  auth,
  openid,
  logs
};
