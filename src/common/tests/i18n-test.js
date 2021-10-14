'use strict';

const t = require('ava');
const common = require('../');
const path = require('path');

t('Internacionalización i18n', t => {
  const i18n = common.i18n;

  // Creando ruta del directorio de los lenguajes
  let pathLang = path.join(__dirname, '/fixtures/lang');

  // Probando mensajes en español
  i18n.init(pathLang, 'es');
  t.is('Hola mundo!', i18n.t('hello'));
  t.is('Mensaje de error', i18n.t('error.message'));
  t.is('Base de datos', i18n.t('error.bd.sequelize.name'));

  // Probando mensajes en inglés
  i18n.init(pathLang, 'en');
  t.is('Hello world!', i18n.t('hello'));
  t.is('Error message', i18n.t('error.message'));
  t.is('Database', i18n.t('error.bd.sequelize.name'));

  // Probando que no existe la ruta
  t.true(i18n.t('message.message').indexOf('Path not found') !== -1, 'Path del json inexistente');

  // Probando si se envia parametro null y vacio
  t.is('', i18n.t(null));
  t.is('', i18n.t());
});
