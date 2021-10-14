'use strict';

const { permissions } = require('../../../lib/auth');

module.exports = function setupResolver (services, res) {
  const { PermisoService } = services;

  return {
    Query: {
      permisos: async (_, args, context) => {
        permissions(context, 'permisos:read');

        let items = await PermisoService.findAll(args);
        return res(items);
      },
      permiso: async (_, args, context) => {
        permissions(context, 'permisos:read');

        let item = await PermisoService.findById(args.id);
        return res(item);
      }
    },
    Mutation: {
      permisoAdd: async (_, args, context) => {
        permissions(context, 'permisos:create');

        args.permiso._user_created = context.id_usuario;
        let item = await PermisoService.createOrUpdate(args.permiso);
        return res(item);
      },
      permisoEdit: async (_, args, context) => {
        permissions(context, 'permisos:update');

        args.permiso._user_updated = context.id_usuario;
        args.permiso._updated_at = new Date();
        args.permiso.id = args.id;
        let item = await PermisoService.createOrUpdate(args.permiso);
        return res(item);
      },
      permisoDelete: async (_, args, context) => {
        permissions(context, 'permisos:delete');

        let deleted = await PermisoService.deleteItem(args.id);
        return { deleted: res(deleted) };
      }
    }
  };
};
