'use strict';

const lang = require('../../lang');
const util = require('../../lib/util');

module.exports = (sequelize, DataTypes) => {
  let fields = {
    id: util.pk,
    grupo: {
      type: DataTypes.STRING(50),
      allowNull: false,
      xlabel: lang.t('fields.grupo')
    },
    codigo: {
      type: DataTypes.STRING(20),
      allowNull: false,
      xlabel: lang.t('fields.codigo')
    },
    nombre: {
      type: DataTypes.STRING(150),
      allowNull: false,
      xlabel: lang.t('fields.nombre')
    },
    descripcion: {
      type: DataTypes.TEXT,
      xlabel: lang.t('fields.descripcion')
    },
    orden: {
      type: DataTypes.INTEGER,
      xlabel: lang.t('fields.orden')
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

  let Constantes = sequelize.define('constantes', fields, {
    timestamps: false,
    tableName: 'sys_constantes'
  });

  return Constantes;
};
