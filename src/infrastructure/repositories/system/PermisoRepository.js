'use strict';

const { getQuery, toJSON } = require('../../lib/util');
const Repository = require('../Repository');

module.exports = function permisosRepository (models, Sequelize) {
  const { permisos, modulos, roles } = models;

  async function findAll (params = {}) {
    let query = getQuery(params);
    query.where = {};

    query.include = [
      {
        attributes: ['label', 'ruta'],
        model: modulos,
        as: 'modulo'
      },
      {
        attributes: ['nombre', 'descripcion'],
        model: roles,
        as: 'rol'
      }
    ];

    if (params.id_modulo) {
      query.where.id_modulo = params.id_modulo;
    }

    if (params.id_rol) {
      query.where.id_rol = params.id_rol;
    }

    const result = await permisos.findAndCountAll(query);
    return toJSON(result);
  }

  async function findById (id) {
    const result = await permisos.findOne({
      where: {
        id
      },
      include: [
        {
          attributes: ['label'],
          model: modulos,
          as: 'modulo'
        },
        {
          attributes: ['nombre'],
          model: roles,
          as: 'rol'
        }
      ]
    });

    if (result) {
      return result.toJSON();
    }
    return null;
  }

  return {
    findAll,
    findById,
    createOrUpdate: (item, t) => Repository.createOrUpdate(item, permisos, t),
    deleteItem: (id, t) => Repository.deleteItem(id, permisos, t)
  };
};
