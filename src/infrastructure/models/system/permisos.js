'use strict';

const lang = require('../../lang');
const util = require('../../lib/util');

module.exports = (sequelize, DataTypes) => {
  let fields = {
    id: util.pk,
    create: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      xlabel: lang.t('fields.create'),
      defaultValue: false
    },
    read: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      xlabel: lang.t('fields.read'),
      defaultValue: false
    },
    update: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      xlabel: lang.t('fields.update'),
      defaultValue: false
    },
    delete: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      xlabel: lang.t('fields.delete'),
      defaultValue: false
    },
    firma: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      xlabel: lang.t('fields.firma'),
      defaultValue: false
    },
    csv: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      xlabel: lang.t('fields.csv'),
      defaultValue: false
    }
  };

  // Agregando campos para el log
  fields = util.setTimestamps(fields);

  let Permisos = sequelize.define('permisos', fields, {
    timestamps: false,
    tableName: 'sys_permisos'
  });

  return Permisos;
};
