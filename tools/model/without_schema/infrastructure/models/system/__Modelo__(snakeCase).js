'use strict';

const lang = require('../../lang');
const util = require('../../lib/util');

module.exports = (sequelize, DataTypes) => {
  let fields = {
    id: util.pk,
    // Columnas de la tabla
    // columna: {
    //   type: DataTypes.STRING //(TEXT, STRING, DATEONLY, DATE, INTEGER),
    //   allowNull: false,
    //   xlabel: lang.t('fields.columna')
    // }
  };

  // Agregando campos para el log
  fields = util.setTimestamps(fields);

  let __Modelo__(pascalCase) = sequelize.define('__Modelo__(snakeCase)s', fields, {
    timestamps: false,
    paranoid: true,
    deletedAt: '_deleted_at',
    tableName: '__Modelo__(snakeCase)s'
  });

  return __Modelo__(pascalCase);
};
