'use strict';

const lang = require('../../lang');
const util = require('../../lib/util');

module.exports = (sequelize, DataTypes) => {
  let fields = {
    id: util.pk,
    nombres: {
      type: DataTypes.STRING(100),
      allowNull: false,
      xlabel: lang.t('fields.nombres')
    },
    primer_apellido: {
      type: DataTypes.STRING(100),
      xlabel: lang.t('fields.primer_apellido')
    },
    segundo_apellido: {
      type: DataTypes.STRING(100),
      xlabel: lang.t('fields.segundo_apellido')
    },
    nombre_completo: {
      type: DataTypes.STRING(255),
      xlabel: lang.t('fields.nombre_completo')
    },
    tipo_documento: {
      type: DataTypes.ENUM,
      values: ['CI', 'PASAPORTE', 'OTRO'],
      defaultValue: 'CI',
      allowNull: false,
      xlabel: lang.t('fields.tipo_documento')
    },
    tipo_documento_otro: {
      type: DataTypes.STRING(50),
      xlabel: lang.t('fields.tipo_documento_otro')
    },
    nro_documento: {
      type: DataTypes.STRING(50),
      xlabel: lang.t('fields.nro_documento')
    },
    fecha_nacimiento: {
      type: DataTypes.DATEONLY,
      xlabel: lang.t('fields.fecha_nacimiento')
    },
    telefono: {
      type: DataTypes.STRING(50),
      xlabel: lang.t('fields.telefono')
    },
    movil: {
      type: DataTypes.STRING(50),
      xlabel: lang.t('fields.movil')
    },
    nacionalidad: {
      type: DataTypes.STRING(100),
      xlabel: lang.t('fields.nacionalidad')
    },
    pais_nacimiento: {
      type: DataTypes.STRING(100),
      xlabel: lang.t('fields.pais_nacimiento')
    },
    genero: {
      type: DataTypes.ENUM,
      values: ['M', 'F', 'OTRO'],
      xlabel: lang.t('fields.genero')
    },
    observacion: {
      type: DataTypes.TEXT,
      xlabel: lang.t('fields.observacion')
    },
    estado: {
      type: DataTypes.ENUM,
      values: ['ACTIVO', 'INACTIVO'],
      defaultValue: 'ACTIVO',
      allowNull: false,
      xlabel: lang.t('fields.estado')
    },
    estado_verificacion: {
      type: DataTypes.ENUM,
      values: ['VERIFICADO_SEGIP', 'OBSERVADO_SEGIP', 'NO_EXISTE_SEGIP', 'POR_VERIFICAR', 'VERIFICADO'],
      defaultValue: 'POR_VERIFICAR',
      xlabel: lang.t('fields.estado_verificacion')
    }
  };

  // Agregando campos para el log
  fields = util.setTimestamps(fields);

  let Users = sequelize.define('personas', fields, {
    timestamps: false,
    tableName: 'sys_personas'
  });

  return Users;
};
