'use strict';

const { getQuery } = require('../../lib/util');
const Repository = require('../Repository');

module.exports = function personasRepository (models, Sequelize) {
  const { personas } = models;
  const Op = Sequelize.Op;

  function findAll (params = {}) {
    let query = getQuery(params);
    query.where = {};

    if (params.nombre_completo) {
      query.where[Op.or] = [
        { nombres: { [Op.iLike]: `%${params.nombre_completo}%` } },
        { primer_apellido: { [Op.iLike]: `%${params.nombre_completo}%` } },
        { segundo_apellido: { [Op.iLike]: `%${params.nombre_completo}%` } }
      ];
    }

    if (params.tipo_documento) {
      query.where.tipo_documento = params.tipo_documento;
    }

    if (params.nro_documento) {
      query.where.nro_documento = {
        [Op.iLike]: `%${params.nro_documento}%`
      };
    }

    if (params.telefono) {
      query.where.telefono = {
        [Op.iLike]: `%${params.telefono}%`
      };
    }

    if (params.movil) {
      query.where.movil = {
        [Op.iLike]: `%${params.movil}%`
      };
    }

    if (params.nacionalidad) {
      query.where.nacionalidad = params.nacionalidad;
    }

    if (params.pais_origen) {
      query.where.pais_origen = params.pais_origen;
    }

    if (params.genero) {
      query.where.genero = params.genero;
    }

    if (params.estado) {
      query.where.estado = params.estado;
    }

    return personas.findAndCountAll(query);
  }

  async function find (params) {
    let cond = {
      where: {
        nro_documento: (params.nro_documento + '').trim(),
        tipo_documento: (params.tipo_documento + '').trim()
      }
    };

    if (params.fecha_nacimiento) {
      cond.where.fecha_nacimiento = params.fecha_nacimiento;
    }

    if (params.nombres) {
      cond.where.nombres = (params.nombres + '').trim();
    }

    if (params.primer_apellido) {
      cond.where.primer_apellido = (params.primer_apellido + '').trim();
    }

    if (params.segundo_apellido) {
      cond.where.segundo_apellido = (params.segundo_apellido + '').trim();
    }

    const result = await personas.findOne(cond);

    if (result) {
      return result.toJSON();
    }
    return null;
  }

  return {
    findAll,
    find,
    findById: (id) => Repository.findById(id, personas),
    createOrUpdate: (item, t) => Repository.createOrUpdate(item, personas, t),
    deleteItem: (id, t) => Repository.deleteItem(id, personas, t)
  };
};
