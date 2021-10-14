'use strict';

const casual = require('casual');
const { setTimestampsSeeder } = require('../lib/util');

// Datos de producción
let items = [
  {
    nombre: 'Agencia de gobierno electrónico y tecnologías de la información y comunicación',
    descripcion: 'La AGETIC está acá para desarrollar tecnología, que permita modernizar el Estado, transformar la gestión pública y reducir la burocracia. Estas tareas son desarrolladas por bolivianas y bolivianos que trabajan investigando, innovando e implementando nuevas técnicas y tecnologías que permitan el desarrollo soberano de nuestra patria. Para esto, la AGETIC busca a los mejores profesionales, gente joven comprometida con su gente y el destino de su país.',
    sigla: 'AGETIC',
    email: 'contacto@agetic.gob.bo',
    telefonos: '(+591 -2) 2128706 - (+591 -2) 2128707',
    direccion: 'Sopocachi, Calle Pedro Salazar Nº 631, esq. Andrés Muñoz. Edificio del Fondo Nacional de Desarrollo Regional(FNDR).Pisos 4 y 5',
    web: 'agetic.gob.bo',
    estado: 'ACTIVO',
    nit: '1022579028'
  }
];

// Agregando datos aleatorios para desarrollo
if (typeof process.env.NODE_ENV === 'undefined' || process.env.NODE_ENV !== 'production') {
  let personas = Array(9).fill().map((_, i) => {
    let item = {
      nombre: casual.company_name,
      descripcion: casual.text,
      sigla: casual.company_suffix,
      email: casual.email,
      telefonos: `${casual.phone},${casual.phone}`,
      direccion: casual.address,
      web: casual.url,
      estado: 'ACTIVO',
      subdomain: casual.domain
    };

    return item;
  });

  items = items.concat(personas);
}

// Asignando datos de log y timestamps a los datos
items = setTimestampsSeeder(items);

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('sys_entidades', items, {});
  },

  down (queryInterface, Sequelize) { }
};
