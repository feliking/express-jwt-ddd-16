'use strict';

const debug = require('debug')('app:service:rol');
const Service = require('../Service');

module.exports = function rolService (repositories, valueObjects, res) {
  const { RolRepository, ModuloRepository, PermisoRepository } = repositories;
  const {
    RolNombre,
    RolPath,
    RolDescripcion
  } = valueObjects;

  async function findAll (params = {}, rol) {
    debug('Lista de roles|filtros');

    switch (rol) {
      case 'ADMIN':
        params.roles = ['ADMIN', 'USUARIO'];
        break;
    }

    return Service.findAll(params, RolRepository, res, 'Roles');
  }

  async function findById (id) {
    debug('Buscando rol por ID');

    return Service.findById(id, RolRepository, res, 'Rol');
  }

  async function createOrUpdate (data) {
    debug('Crear o actualizar rol');

    let rol;
    try {
      validate(data);

      rol = await RolRepository.createOrUpdate(data);
      debug('Rol creado', rol);

      if (data.id === undefined) {
        try {
          let items = await ModuloRepository.findAll();
          if (items.count) {
            for (let modulo of items.rows) {
              let permiso = await PermisoRepository.createOrUpdate({
                id_rol: rol.id,
                id_modulo: modulo.id,
                _user_created: rol._user_created
              });
              debug(`Nuevo permiso para: ${modulo.label} - ID: ${permiso.id}`);
            }
          } else {
            return res.warning('No se tiene registrado ningún Módulo para crear sus permisos');
          }
        } catch (e) {
          return res.error(e);
        }
      }
    } catch (e) {
      return res.error(e);
    }

    if (!rol) {
      return res.error(new Error(`El rol no pudo ser creado`));
    }

    return res.success(rol);
  }

  async function deleteItem (id) {
    debug('Eliminando rol');

    return Service.deleteItem(id, RolRepository, res, 'Rol');
  }

  function validate (data) {
    Service.validate(data, {
      nombre: RolNombre,
      path: RolPath,
      descripcion: RolDescripcion
    });
  }

  return {
    findAll,
    findById,
    createOrUpdate,
    deleteItem
  };
};
