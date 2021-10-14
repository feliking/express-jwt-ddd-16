'use strict';

const { getQuery } = require('../../lib/util');
const Repository = require('../Repository');

module.exports = function modulosRepository (models, Sequelize) {
  const { modulos } = models;
  const Op = Sequelize.Op;

  function findAll (params = {}) {
    let query = getQuery(params);
    query.where = {};

    if (params.label) {
      query.where.label = {
        [Op.iLike]: `%${params.label}%`
      };
    }

    if (params.estado) {
      query.where.estado = params.estado;
    }

    if (params.visible) {
      query.where.visible = params.visible;
    }

    if (params.id_modulo) {
      query.where.id_modulo = params.id_modulo;
    }

    if (params.id_modulo !== undefined && (params.id_modulo === 0 || params.id_modulo === '0')) {
      query.where.id_modulo = {
        [Op.eq]: null
      };
    }

    if (params.id_seccion) {
      query.where.id_seccion = params.id_seccion;
    }

    if (params.id_seccion !== undefined && (params.id_seccion === 0 || params.id_seccion === '0')) {
      query.where.id_seccion = {
        [Op.eq]: null
      };
    }

    if (params.menu) {
      query.order = [
        ['id_modulo', 'DESC'],
        ['orden', 'ASC']
      ];
    }

    return modulos.findAndCountAll(query);
  }

  return {
    findAll,
    findById: (id) => Repository.findById(id, modulos),
    createOrUpdate: (item, t) => Repository.createOrUpdate(item, modulos, t),
    deleteItem: (id, t) => Repository.deleteItem(id, modulos, t)
  };
};
