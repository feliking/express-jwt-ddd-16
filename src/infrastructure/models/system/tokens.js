'use strict';

const lang = require('../../lang');
const util = require('../../lib/util');

module.exports = (sequelize, DataTypes) => {
  let fields = {
    id: util.pk,
    token: {
      type: DataTypes.TEXT,
      allowNull: false,
      xlabel: lang.t('fields.token')
    },
    tipo: {
      type: DataTypes.ENUM,
      values: ['USUARIO', 'OPERADOR', 'ENTIDAD'],
      defaultValue: 'USUARIO',
      allowNull: false,
      xlabel: lang.t('fields.tipo')
    },
    estado: {
      type: DataTypes.ENUM,
      values: ['ACTIVO', 'INACTIVO'],
      defaultValue: 'ACTIVO',
      allowNull: false,
      xlabel: lang.t('fields.estado')
    }
  };

  // Agregando campos para el log
  fields = util.setTimestamps(fields);

  let Tokens = sequelize.define('tokens', fields, {
    timestamps: false,
    tableName: 'sys_tokens'
  });

  return Tokens;
};
