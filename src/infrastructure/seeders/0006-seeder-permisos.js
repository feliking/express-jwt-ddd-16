'use strict';

const { setTimestampsSeeder } = require('../lib/util');

let items = [];

// Este bloque se debe reemplazar cuando se tengan los permisos definidos para cada módulo por rol
const iniModules = 1;
const nroModules = 10;
const nroRoles = 3;

for (let rol = 1; rol <= nroRoles; rol++) {
  for (let modulo = iniModules; modulo <= nroModules; modulo++) {
    items.push({
      create: true,
      read: true,
      update: true,
      delete: true,
      firma: false,
      csv: false,
      id_modulo: modulo,
      id_rol: rol
    });
  }
}

// Asignando datos de log y timestamps a los datos
items = setTimestampsSeeder(items);

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('sys_permisos', items, {});
  },

  down (queryInterface, Sequelize) { }
};
