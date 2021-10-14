'use strict';

const debug = require('debug')('app:service:modulo');
const Service = require('../Service');

module.exports = function moduloService (repositories, valueObjects, res) {
  const { ModuloRepository, PermisoRepository, RolRepository } = repositories;
  const PermisoService = require('./PermisoService')(repositories, valueObjects, res);
  const {
    ModuloRuta,
    ModuloLabel,
    ModuloIcono,
    ModuloOrden,
    ModuloEstado,
    ModuloVisible
  } = valueObjects;

  async function getMenu (idRol = 1, subsection = false, all = false) {
    debug(`Obteniendo menú y permisos del rol ${idRol}`);
    let lista;
    let oPermisos = {};
    let permissions = [];
    let obj = {};
    let menu = [];

    try {
      let items = await PermisoRepository.findAll({ id_rol: idRol });
      items.rows.map(item => {
        oPermisos['item-' + item.id_modulo] = item;

        let path = item.modulo.ruta;
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

      lista = await ModuloRepository.findAll({ menu: true });
      lista = lista.rows;

      // Reordenando módulos en forma de árbol
      for (let i in lista) {
        let item = lista[i];
        if (!item['id_modulo'] && !item['id_seccion']) { // No tiene hijos el nodo
          item['type'] = 'module';
          obj['item-' + item['id']] = item;
        } else {
          if (!item['id_seccion']) { // No depende de una sección
            item['type'] = 'section';
            item['parent'] = obj['item-' + item['id_modulo']].id;
            if (!obj['item-' + item['id_modulo']]['children']) {
              obj['item-' + item['id_modulo']]['children'] = {};
            }
            obj['item-' + item['id_modulo']]['children'][item['id']] = item;
          } else if (subsection) { // Depende de una sección
            item['type'] = 'subsection';
            if (!obj['item-' + item['id_modulo']]['children'][item['id_seccion']]['children']) {
              obj['item-' + item['id_modulo']]['children'][item['id_seccion']]['children'] = {};
            }
            obj['item-' + item['id_modulo']]['children'][item['id_seccion']]['children'][item['id']] = item;
          }
        }
      }

      // Generando menú de acuerdo a los permisos del rol
      for (let i in obj) {
        let item = {
          url: obj[i].ruta,
          icon: obj[i].icono,
          label: obj[i].label
        };
        if (all) {
          item.orden = obj[i].orden;
          item.visible = obj[i].visible;
          item.estado = obj[i].estado;
        }
        if (obj[i].children) {
          let items = obj[i].children;
          item.submenu = [];
          for (let j in items) {
            let permiso = oPermisos['item-' + items[j].id];
            if (all || (permiso && permiso.read && items[j].estado === 'ACTIVO' && items[j].visible)) {
              let obj = {
                url: items[j].ruta,
                label: items[j].label
              };
              if (all) {
                obj.orden = items[j].orden;
                obj.visible = items[j].visible;
                obj.estado = items[j].estado;
              }
              item.submenu.push(obj);
            }
          }
        }
        if (oPermisos['item-' + obj[i].id].read && obj[i].estado === 'ACTIVO' && obj[i].visible) {
          menu.push(item);
        }
      }
    } catch (e) {
      return res.error(e);
    }

    // si la opción de un menu tiene un solo submenu entonces se lo asigna ese submenu a esa opción
    // for (let i in menu) {
    //   if (menu[i].submenu && menu[i].submenu.length === 1) {
    //     menu[i] = menu[i].submenu[0];
    //   }
    // }

    return res.success({
      permissions,
      menu
    });
  }

  async function findAll (params = {}) {
    debug('Lista de modulos|filtros', params);

    return Service.findAll(params, ModuloRepository, res, 'Módulos');
  }

  async function findById (id) {
    debug('Buscando modulo por ID');

    return Service.findById(id, ModuloRepository, res, 'Módulo');
  }

  async function createOrUpdate (data) {
    debug('Crear o actualizar modulo');

    let modulo;
    try {
      validate(data);
      modulo = await ModuloRepository.createOrUpdate(data);
    } catch (e) {
      return res.error(e);
    }

    if (!modulo) {
      return res.warning(new Error(`El modulo no pudo ser creado`));
    }

    if (data.id === undefined) {
      try {
        let items = await RolRepository.findAll();
        if (items.count) {
          for (let rol of items.rows) {
            let permiso = await PermisoRepository.createOrUpdate({
              id_rol: rol.id,
              id_modulo: modulo.id,
              _user_created: modulo._user_created
            });
            debug(`Nuevo permiso para: ${modulo.label} - ID: ${permiso.id}`);
          }
        } else {
          return res.warning('No se tiene registrado ningún Rol para crear sus permisos');
        }
      } catch (e) {
        return res.error(e);
      }
    }

    return res.success(modulo);
  }

  async function deleteItem (id) {
    debug('Eliminando módulo y sus permisos');

    let deleted;
    try {
      let items = await PermisoRepository.findAll({ id_modulo: id });

      // Eliminando permisos del módulo
      for (var i in items.rows) {
        await PermisoService.deleteItem(items.rows[i].id);
      }

      // Eliminando módulo
      deleted = await ModuloRepository.deleteItem(id);
    } catch (e) {
      return res.error(e);
    }

    if (deleted === -1) {
      return res.warning(new Error(`No existe el módulo`));
    }

    if (deleted === 0) {
      return res.warning(new Error(`El módulo ya fue eliminado`));
    }

    return res.success(deleted > 0);
  }

  function validate (data) {
    Service.validate(data, {
      ruta: ModuloRuta,
      label: ModuloLabel,
      icono: ModuloIcono,
      orden: ModuloOrden,
      visible: ModuloVisible,
      estado: ModuloEstado
    });
  }

  return {
    getMenu,
    findAll,
    findById,
    createOrUpdate,
    deleteItem
  };
};
