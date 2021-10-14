'use strict';

const lang = require('../../lang');
const util = require('../../lib/util');

module.exports = (sequelize, DataTypes) => {
  let fields = {
    id: util.pk,
    usuario: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false,
      xlabel: lang.t('fields.usuario')
    },
    contrasena: {
      type: DataTypes.STRING(255),
      xlabel: lang.t('fields.contrasena')
    },
    email: {
      type: DataTypes.STRING(100),
      unique: true,
      xlabel: lang.t('fields.email')
    },
    email_verified_at: {
      type: DataTypes.DATE,
      xlabel: lang.t('fields.email_verified_at')
    },
    cargo: {
      type: DataTypes.STRING(100),
      xlabel: lang.t('fields.cargo')
    },
    ultimo_login: {
      type: DataTypes.DATE,
      xlabel: lang.t('fields.ultimo_login')
    },
    nro_intentos: {
      type: DataTypes.INTEGER,
      xlabel: lang.t('fields.nro_intentos'),
      defaultValue: 0
    },
    fecha_bloqueo: {
      type: DataTypes.DATE,
      xlabel: lang.t('fields.fecha_bloqueo')
    },
    fecha_reseteo_pass: {
      type: DataTypes.DATE,
      xlabel: lang.t('fields.fecha_bloqueo')
    },
    token: {
      type: DataTypes.TEXT,
      xlabel: lang.t('fields.token')
    },
    extra: {
      type: DataTypes.JSON,
      xlabel: lang.t('fields.tour')
    },
    estado: {
      type: DataTypes.ENUM,
      values: ['ACTIVO', 'INACTIVO', 'PENDIENTE', 'BLOQUEADO'],
      defaultValue: 'ACTIVO',
      allowNull: false,
      xlabel: lang.t('fields.estado')
    }
  };

  // Agregando campos para el log
  fields = util.setTimestamps(fields);

  let Users = sequelize.define('usuarios', fields, {
    timestamps: false,
    tableName: 'sys_usuarios'
  });

  return Users;
};
