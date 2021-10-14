'use strict';

const { getQuery } = require('../../lib/util');
const Repository = require('../Repository');

module.exports = function tokensRepository (models, Sequelize) {
  const { tokens } = models;

  function findAll (params = {}) {
    let query = getQuery(params);
    query.where = {};

    if (params.tipo) {
      query.where.tipo = params.tipo;
    }

    return tokens.findAndCountAll(query);
  }

  return {
    findAll,
    findById: (id) => Repository.findById(id, tokens),
    createOrUpdate: (item, t) => Repository.createOrUpdate(item, tokens, t),
    deleteItem: (id, t) => Repository.deleteItem(id, tokens, t)
  };
};
