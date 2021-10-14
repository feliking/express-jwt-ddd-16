'use strict';

const t = require('ava');
const common = require('../');
const { config } = common;

t('Config DB', t => {
  const { db } = config;

  // Probando configuración de bd
  t.is('postgres', db.database);
  t.is('postgres', db.username);
  t.is('postgres', db.password);
  t.is('localhost', db.host);
});
