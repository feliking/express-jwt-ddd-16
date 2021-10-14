'use strict';
const { permissions } = require('../../../lib/auth');

module.exports = function setupResolver (services, res) {
  const { ModuloService } = services;

  return {
    Query: {
      modulos: async (_, args, context) => {
        permissions(context, 'modulos:read');

        let items = await ModuloService.findAll(args);
        return res(items);
      },
      modulo: async (_, args, context) => {
        permissions(context, 'modulos:read');

        let items = await ModuloService.findById(args.id);
        return res(items);
      }
    },
    Mutation: {
      moduloAdd: async (_, args, context) => {
        permissions(context, 'modulos:create');

        args.modulo._user_created = context.id_usuario;
        let item = await ModuloService.createOrUpdate(args.modulo);
        return res(item);
      },
      moduloEdit: async (_, args, context) => {
        permissions(context, 'modulos:update');

        args.modulo._user_updated = context.id_usuario;
        args.modulo._updated_at = new Date();
        args.modulo.id = args.id;
        let item = await ModuloService.createOrUpdate(args.modulo);
        return res(item);
      },
      moduloDelete: async (_, args, context) => {
        permissions(context, 'modulos:delete');

        let deleted = await ModuloService.deleteItem(args.id);
        return { deleted: res(deleted) };
      }
    }
  };
};
