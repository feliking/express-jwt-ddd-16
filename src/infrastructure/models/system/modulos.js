'use strict';

const lang = require('../../lang');
const util = require('../../lib/util');

module.exports = (sequelize, DataTypes) => {
  let fields = {
    id: util.pk,
    ruta: {
      type: DataTypes.STRING(50),
      unique: true,
      xlabel: lang.t('fields.ruta')
    },
    label: {
      type: DataTypes.STRING(50),
      xlabel: lang.t('fields.label')
    },
    icono: {
      type: DataTypes.STRING(30),
      xlabel: lang.t('fields.icono')
    },
    orden: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
      xlabel: lang.t('fields.orden')
    },
    estado: {
      type: DataTypes.ENUM,
      values: ['ACTIVO', 'INACTIVO'],
      defaultValue: 'ACTIVO',
      allowNull: false,
      xlabel: lang.t('fields.estado')
    },
    visible: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      xlabel: lang.t('fields.visible'),
      defaultValue: true
    }
  };

  // Agregando campos para el log
  fields = util.setTimestamps(fields);

  let Modulos = sequelize.define('modulos', fields, {
    timestamps: false,
    tableName: 'sys_modulos'
  });

  return Modulos;
};
