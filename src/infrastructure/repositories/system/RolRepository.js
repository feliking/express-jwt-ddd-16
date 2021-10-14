'use strict';

const { getQuery } = require('../../lib/util');
const Repository = require('../Repository');

module.exports = function rolesRepository (models, Sequelize) {
  const { roles } = models;
  const Op = Sequelize.Op;

  function findAll (params = {}) {
    let query = getQuery(params);
    query.where = {};

    if (params.id_roles) {
      query.where.id = {
        [Op.or]: params.id_roles
      };
    }

    if (params.roles) {
      query.where.nombre = {
        [Op.in]: params.roles
      };
    }

    return roles.findAndCountAll(query);
  }

  return {
    findAll,
    findById: (id) => Repository.findById(id, roles),
    createOrUpdate: (item, t) => Repository.createOrUpdate(item, roles, t),
    deleteItem: (id, t) => Repository.deleteItem(id, roles, t)
  };
};
