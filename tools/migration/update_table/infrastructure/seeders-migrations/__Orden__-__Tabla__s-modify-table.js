'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Modificar columna
    // await queryInterface.changeColumn('__Tabla__s', 'columna', {
    //   type: Sequelize.UUID,
    //   defaultValue: Sequelize.UUIDV4
    // });

    // Adicionar columna
    // await queryInterface.addColumn('__Tabla__s', 'columna', {
    //   type: Sequelize.STRING,
    //   allowNull: true,
    // });
    
    // Eliminar columna
    // await queryInterface.removeColumn('__Tabla__s', 'columna');
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('__Tabla__s');
  }
};