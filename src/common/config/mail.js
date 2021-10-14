'use strict';

const debug = require('debug')('base-backend:correo');

const correoConfig = {
  origen: process.env.MAIL_SENDER,
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: process.env.MAIL_SECURE === 'true',
  ignoreTLS: process.env.MAIL_IGNORE_TLS === 'true',
  auth: {
    user: process.env.MAIL_AUTH_USER,
    pass: process.env.MAIL_AUTH_PASS
  },
  tls: {
    rejectUnauthorized: process.env.MAIL_TLS_REJECT_UNAUTHORIZED === 'true'
  },
  logging: s => debug(s)
};

module.exports = correoConfig;
