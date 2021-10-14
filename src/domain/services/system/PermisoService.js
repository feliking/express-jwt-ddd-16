'use strict';

const debug = require('debug')('app:service:permiso');
const Service = require('../Service');

module.exports = function permisoService (repositories, valueObjects, res) {
  const { PermisoRepository } = repositories;
  const {
    PermisoCreate,
    PermisoRead,
    PermisoUpdate,
    PermisoDelete,
    PermisoFirma,
    PermisoCsv
  } = valueObjects;

  async function getPermisos (idRol) {
    debug('Obteniendo permisos');
    let lista;
    let permissions = [];

    try {
      lista = await PermisoRepository.findAll({ id_rol: idRol });
      lista.rows.map(item => {
        let path = item['modulo.ruta'];
        if (item.read) {
          permissions.push(`${path}:read`);
        }
        if (item.create) {
          permissions.push(`${path}:create`);
        }
        if (item.update) {
          permissions.push(`${path}:update`);
        }
        if (item.delete) {
          permissions.push(`${path}:delete`);
        }
        if (item.csv) {
          permissions.push(`${path}:csv`);
        }
        if (item.firma) {
          permissions.push(`${path}:firma`);
        }
      });
    } catch (e) {
      return res.error(e);
    }
    return res.success(permissions);
  }

  async function findAll (params = {}) {
    debug('Lista de permisos|filtros');

    return Service.findAll(params, PermisoRepository, res, 'Permisos');
  }

  async function findById (id) {
    debug('Buscando permiso por ID');

    return Service.findById(id, PermisoRepository, res, 'Permiso');
  }

  async function createOrUpdate (data) {
    debug('Crear o actualizar permiso');

    validate(data);

    return Service.createOrUpdate(data, PermisoRepository, res, 'Permiso');
  }

  async function deleteItem (id) {
    debug('Eliminando permiso');

    return Service.deleteItem(id, PermisoRepository, res, 'Permiso');
  }

  function validate (data) {
    Service.validate(data, {
      create: PermisoCreate,
      read: PermisoRead,
      update: PermisoUpdate,
      delete: PermisoDelete,
      firma: PermisoFirma,
      csv: PermisoCsv
    });
  }

  return {
    getPermisos,
    findAll,
    findById,
    createOrUpdate,
    deleteItem
  };
};
