'use strict';

const lang = require('../../lang');
const util = require('../../lib/util');

module.exports = (sequelize, DataTypes) => {
  let fields = {
    id: util.pk,
    filename: {
      type: DataTypes.TEXT,
      allowNull: false,
      xlabel: lang.t('fields.filename')
    },
    nombre: {
      type: DataTypes.STRING(255),
      xlabel: lang.t('fields.nombre')
    },
    mimetype: {
      type: DataTypes.STRING(100),
      xlabel: lang.t('fields.mimetype')
    },
    path: {
      type: DataTypes.TEXT,
      allowNull: false,
      xlabel: lang.t('fields.ruta')
    },
    size: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      xlabel: lang.t('fields.size')
    },
    es_imagen: {
      type: DataTypes.BOOLEAN,
      xlabel: lang.t('fields.es_imagen'),
      defaultValue: false
    },
    img_width: {
      type: DataTypes.INTEGER,
      xlabel: lang.t('fields.img_width')
    },
    img_height: {
      type: DataTypes.INTEGER,
      xlabel: lang.t('fields.img_height')
    },
    estado: {
      type: DataTypes.ENUM,
      values: ['ACTIVO', 'INACTIVO', 'ELIMINADO'],
      defaultValue: 'ACTIVO',
      allowNull: false,
      xlabel: lang.t('fields.estado')
    }
  };

  // Agregando campos para el log
  fields = util.setTimestamps(fields);

  let Archivos = sequelize.define('archivos', fields, {
    timestamps: false,
    tableName: 'sys_archivos'
  });

  return Archivos;
};
