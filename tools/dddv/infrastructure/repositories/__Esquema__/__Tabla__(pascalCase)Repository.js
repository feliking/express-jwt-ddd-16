"use strict";

const { getQuery } = require("../../lib/util");
const Repository = require("../Repository");

module.exports = function __Tabla__(snakeCase)Repository(models, Sequelize) {
  const { __Tabla__(snakeCase) } = models;
  const Op = Sequelize.Op;

  function findAll(params = {}) {
    let query = getQuery(params);
    query.where = {};

    // Filtros

    // Filtro para cadenas usando LIKE
    // if (params.columna) {
    //   query.where.columna = {
    //     [Op.iLike]: `%${params.columna}%`
    //   };
    // }

    // Filtro para datos exactos WHERE
    // if (params.columna) {
    //   query.where.columna = params.columna;
    // }

    return __Tabla__(snakeCase).findAndCountAll(query);
  }

  return {
    findAll,
    findById: (id) => Repository.findById(id, __Tabla__(snakeCase)),
    createOrUpdate: (item, t) => Repository.createOrUpdate(item, __Tabla__(snakeCase), t),
    deleteItem: (id, t) => Repository.deleteItem(id, __Tabla__(snakeCase), t),
  };
};
