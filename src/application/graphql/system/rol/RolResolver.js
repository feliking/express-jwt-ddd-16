'use strict';
const { permissions } = require('../../../lib/auth');

module.exports = function setupResolver (services, res) {
  const { RolService } = services;

  return {
    Query: {
      roles: async (_, args, context) => {
        permissions(context, 'roles:read|usuarios:read');

        let items = await RolService.findAll(args, context.rol);
        return res(items);
      },
      rol: async (_, args, context) => {
        permissions(context, 'roles:read');

        let items = await RolService.findById(args.id);
        return res(items);
      }
    },
    Mutation: {
      rolAdd: async (_, args, context) => {
        permissions(context, 'roles:create');

        args.rol._user_created = context.id_usuario;
        let item = await RolService.createOrUpdate(args.rol);
        return res(item);
      },
      rolEdit: async (_, args, context) => {
        permissions(context, 'roles:update');

        args.rol._user_updated = context.id_usuario;
        args.rol._updated_at = new Date();
        args.rol.id = args.id;
        let item = await RolService.createOrUpdate(args.rol);
        return res(item);
      },
      rolDelete: async (_, args, context) => {
        permissions(context, 'roles:delete');

        let deleted = await RolService.deleteItem(args.id);
        return { deleted: res(deleted) };
      }
    }
  };
};
