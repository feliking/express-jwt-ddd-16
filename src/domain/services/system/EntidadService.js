'use strict';

const debug = require('debug')('app:service:entidad');
const Service = require('../Service');

module.exports = function entidadService (repositories, valueObjects, res) {
  const { EntidadRepository } = repositories;
  const {
    EntidadNombre,
    EntidadDescripcion,
    EntidadSigla,
    EntidadEmail,
    EntidadTelefonos,
    EntidadDireccion,
    EntidadWeb,
    EntidadEstado,
    EntidadSubdomain,
    EntidadCodigoPortal,
    EntidadNit,
    EntidadUsuario
  } = valueObjects;

  async function findAll (params = {}, rol, idEntidad) {
    debug('Lista de entidad|filtros');

    switch (rol) {
      case 'ADMIN':
        params.id_entidad = idEntidad;
        break;
      case 'USUARIO':
        params.id_entidad = idEntidad;
        break;
    }

    return Service.findAll(params, EntidadRepository, res, 'Entidad');
  }

  async function findById (id) {
    debug('Buscando entidad por ID', id);

    return Service.findById(id, EntidadRepository, res, 'Entidad');
  }

  async function createOrUpdate (data) {
    debug('Crear o actualizar entidad');

    validate(data);

    return Service.createOrUpdate(data, EntidadRepository, res, 'Entidad');
  }

  async function deleteItem (id) {
    debug('Eliminando entidad');

    return Service.deleteItem(id, EntidadRepository, res, 'Entidad');
  }

  function validate (data) {
    Service.validate(data, {
      nombre: EntidadNombre,
      descripcion: EntidadDescripcion,
      sigla: EntidadSigla,
      email: EntidadEmail,
      telefonos: EntidadTelefonos,
      direccion: EntidadDireccion,
      web: EntidadWeb,
      estado: EntidadEstado,
      subdomain: EntidadSubdomain,
      codigo_portal: EntidadCodigoPortal,
      nit: EntidadNit,
      usuario: EntidadUsuario
    });
  }

  return {
    findAll,
    findById,
    createOrUpdate,
    deleteItem
  };
};
