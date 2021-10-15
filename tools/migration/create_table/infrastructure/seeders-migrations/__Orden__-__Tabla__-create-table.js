'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('__Tabla__(snakeCase)s', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      // columna: {
      //   type: Sequelize.STRING
      // }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('__Tabla__(snakeCase)s');
  }
};