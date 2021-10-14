'use strict';

const { setTimestampsSeeder } = require('../lib/util');

let items = [
  { nombre: 'SUPERADMIN', descripcion: 'Super Administrador', path: 'entidades' },
  { nombre: 'ADMIN', descripcion: 'Administrador', path: 'usuarios' },
  { nombre: 'USUARIO', descripcion: 'Usuario', path: 'account' }
];

// Asignando datos de log y timestamps a los datos
items = setTimestampsSeeder(items);

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('sys_roles', items, {});
  },

  down (queryInterface, Sequelize) { }
};
