'use strict';

const casual = require('casual');
const { setTimestampsSeeder } = require('../lib/util');
const { text } = require('../../common');

// Datos de producción
let items = [
  {
    usuario: 'admin',
    email: 'admin@email.gob.bo',
    estado: 'ACTIVO',
    cargo: 'Profesional',
    id_persona: 1,
    id_rol: 1,
    id_entidad: 1
  },
  {
    usuario: 'ciudadano',
    email: 'agepic-3837143@yopmail.com',
    estado: 'ACTIVO',
    cargo: '',
    id_persona: 2,
    id_rol: 3,
    id_entidad: 1
  }
];

// Agregando datos aleatorios para desarrollo
if (typeof process.env.NODE_ENV === 'undefined' || process.env.NODE_ENV !== 'production') {
  let usuarios = Array(19).fill().map((_, i) => {
    let item = {
      usuario: casual.username,
      email: casual.email,
      estado: casual.random_element(['ACTIVO', 'INACTIVO']),
      id_persona: casual.integer(3, 10),
      id_rol: casual.integer(2, 3),
      id_entidad: casual.integer(1, 10)
    };

    return item;
  });

  items = items.concat(usuarios);
}

// Asignando datos de log y timestamps a los datos
items = setTimestampsSeeder(items);

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      let hash = await text.hashPassword('123456');
      for (let item of items) {
        item.contrasena = hash;
      }
      await queryInterface.bulkInsert('sys_usuarios', items, {});
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  },

  down (queryInterface, Sequelize) { }
};
