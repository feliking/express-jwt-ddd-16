'use strict';

const { getQuery } = require('../../lib/util');
const Repository = require('../Repository');

module.exports = function entidadesRepository (models, Sequelize) {
  const { entidades } = models;
  const Op = Sequelize.Op;

  function findAll (params = {}) {
    let query = getQuery(params);
    query.where = {};

    if (params.nombre) {
      query.where.nombre = {
        [Op.iLike]: `%${params.nombre}%`
      };
    }

    if (params.sigla) {
      query.where.sigla = {
        [Op.iLike]: `%${params.sigla}%`
      };
    }

    if (params.estado) {
      query.where.estado = params.estado;
    }

    if (params.id_entidad) {
      query.where.id = params.id_entidad;
    }

    return entidades.findAndCountAll(query);
  }

  async function findByNit (nit) {
    const result = await entidades.findOne({
      where: {
        nit
      }
    });
    if (result) {
      return result.toJSON();
    }
    return null;
  }

  return {
    findAll,
    findByNit,
    findById: (id) => Repository.findById(id, entidades),
    createOrUpdate: (item, t) => Repository.createOrUpdate(item, entidades, t),
    deleteItem: (id, t) => Repository.deleteItem(id, entidades, t)
  };
};
