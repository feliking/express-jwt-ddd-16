'use strict';
const { permissions } = require('../../../lib/auth');

module.exports = function setupResolver (services, res) {
  const { EntidadService } = services;

  return {
    Query: {
      entidades: async (_, args, context) => {
        permissions(context, 'entidades:read|usuarios:read');

        let items = await EntidadService.findAll(args, context.rol, context.id_entidad);
        return res(items);
      },
      entidad: async (_, args, context) => {
        permissions(context, 'entidades:read');

        let item = await EntidadService.findById(args.id);
        return res(item);
      }
    },
    Mutation: {
      entidadAdd: async (_, args, context) => {
        permissions(context, 'entidades:create');

        args.entidad._user_created = context.id_usuario;
        let item = await EntidadService.createOrUpdate(args.entidad);
        return res(item);
      },
      entidadEdit: async (_, args, context) => {
        permissions(context, 'entidades:update');

        args.entidad._user_updated = context.id_usuario;
        args.entidad._updated_at = new Date();
        args.entidad.id = args.id;
        let item = await EntidadService.createOrUpdate(args.entidad);
        return res(item);
      },
      entidadDelete: async (_, args, context) => {
        permissions(context, 'entidades:delete');

        let deleted = await EntidadService.deleteItem(args.id);
        return { deleted: res(deleted) };
      }
    }
  };
};
