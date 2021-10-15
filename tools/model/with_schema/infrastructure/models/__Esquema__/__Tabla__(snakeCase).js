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

  let __Tabla__(pascalCase) = sequelize.define('__Tabla__(snakeCase)s', fields, {
    timestamps: false,
    paranoid: true,
    deletedAt: '_deleted_at',
    tableName: '__Tabla__(snakeCase)s',
    schema: '__Esquema__(snakeCase)'
  });

  return __Tabla__(pascalCase);
};
