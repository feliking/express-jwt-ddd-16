'use strict';

const casual = require('casual');
const { setTimestampsSeeder } = require('../lib/util');

// Datos de producción
let items = [
  {
    nombres: 'Administrador',
    primer_apellido: 'Sistema',
    segundo_apellido: '',
    nombre_completo: 'Administrador del sistema',
    tipo_documento: 'CI',
    tipo_documento_otro: '',
    nro_documento: '123456',
    fecha_nacimiento: new Date(1990, 0, 1),
    telefono: '123456',
    movil: '70012345',
    nacionalidad: 'BOLIVIANA',
    pais_nacimiento: 'BOLIVIA',
    genero: 'F',
    estado: 'ACTIVO'
  },
  {
    nombres: 'KATHYUSKA',
    primer_apellido: 'PEREDO',
    segundo_apellido: 'DURAN',
    nombre_completo: '',
    tipo_documento: 'CI',
    tipo_documento_otro: '',
    nro_documento: '3837143',
    fecha_nacimiento: new Date(1982, 9, 27),
    telefono: '',
    movil: '60606211',
    nacionalidad: 'BOLIVIANA',
    pais_nacimiento: 'BOLIVIA',
    genero: 'F',
    estado: 'ACTIVO'
  }
];

// Agregando datos aleatorios para desarrollo
if (typeof process.env.NODE_ENV === 'undefined' || process.env.NODE_ENV !== 'production') {
  let personas = Array(9).fill().map((_, i) => {
    let item = {
      nombres: casual.first_name,
      primer_apellido: casual.last_name,
      segundo_apellido: casual.last_name,
      nombre_completo: casual.full_name,
      tipo_documento: casual.random_element(['CI', 'PASAPORTE']),
      tipo_documento_otro: '',
      nro_documento: casual.integer(1, 20),
      fecha_nacimiento: casual.date('YYYY-MM-DD'),
      telefono: casual.phone,
      movil: casual.phone,
      nacionalidad: 'BOLIVIANA',
      pais_nacimiento: 'BOLIVIA',
      genero: casual.random_element(['F', 'F', 'OTRO']),
      estado: casual.random_element(['ACTIVO', 'INACTIVO'])
    };

    return item;
  });

  items = items.concat(personas);
}

// Asignando datos de log y timestamps a los datos
items = setTimestampsSeeder(items);

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('sys_personas', items, {});
  },

  down (queryInterface, Sequelize) { }
};
