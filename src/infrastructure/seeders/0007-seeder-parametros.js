'use strict';

const { setTimestampsSeeder } = require('../lib/util');
const templateCorreo = require('../seeders-templates/correo-tmpl');

let items = [
  { nombre: 'JWT_TOKEN_EXPIRATION', valor: 240, label: 'Tiempo de expiración del Token', descripcion: 'Tiempo de expiración del Token JWT en minutos' },
  { nombre: 'EMAIL_ORIGEN', valor: 'correo@agetic.gob.bo', label: 'Remitente', descripcion: 'Email del remitente del sistema para envío de correos' },
  { nombre: 'EMAIL_HOST', valor: 'smtp.agetic.gob.bo', label: 'Host', descripcion: 'Host del servicio de correos para envío de correos' },
  { nombre: 'EMAIL_PORT', valor: 587, label: 'Puerto', descripcion: 'Puerto para envío de correos' },
  { nombre: 'TEMPLATE_CORREO_BASE', valor: templateCorreo, label: 'Template base para el correo', descripcion: 'Template base para el correo electrónico' },
  { nombre: 'URL_ADMIN', valor: `http://localhost:8888/#/`, label: 'URL del administrador', descripcion: 'URL para acceder al administrador' },
  { nombre: 'URL_PORTAL', valor: `http://localhost:8080/#/`, label: 'URL del portal', descripcion: 'URL para acceder al portal' },
  { nombre: 'TIEMPO_BLOQUEO', valor: 10, label: 'Tiempo de bloqueo', descripcion: 'Tiempo cuando un usuario sea bloqueado en minutos' },
  { nombre: 'NRO_MAX_INTENTOS', valor: 3, label: 'Número máximo de intentos', descripcion: 'Número máximo de intentos que un usuario puede realizar el login' },
  { nombre: 'VALIDAR_SEGIP', valor: `SI`, label: 'Validar con el SEGIP', descripcion: 'Validar con el SEGIP' }
];

// Asignando datos de log y timestamps a los datos
items = setTimestampsSeeder(items);

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('parametros', items, {});
  },

  down (queryInterface, Sequelize) { }
};
