'use strict';

const { permissions } = require('../../../lib/auth');

module.exports = function setupResolver (services, res) {
  const { UsuarioService } = services;

  return {
    Query: {
      usuarios: async (_, args, context) => {
        permissions(context, 'usuarios:read');

        let items = await UsuarioService.findAll(args, context.rol, context.id_entidad);
        return res(items);
      },
      usuario: async (_, args, context) => {
        permissions(context, 'usuarios:read');

        let item = await UsuarioService.findById(args.id);
        return res(item);
      },
      usuarioOnlyToken: async (_, args, context) => {
        let item = await UsuarioService.findById(args.id);
        return res(item);
      }
    },
    Mutation: {
      usuarioAdd: async (_, args, context) => {
        permissions(context, 'usuarios:create');

        args.usuario._user_created = context.id_usuario;
        let item = await UsuarioService.createOrUpdate(args.usuario, context.rol, context.id_entidad);
        return res(item);
      },
      usuarioEdit: async (_, args, context) => {
        permissions(context, 'usuarios:update');

        args.usuario._user_updated = context.id_usuario;
        args.usuario._updated_at = new Date();
        args.usuario.id = args.id;
        let item = await UsuarioService.createOrUpdate(args.usuario);
        return res(item);
      },
      usuarioUpdate: async (_, args, context) => {
        permissions(context, 'usuarios:update');

        args.usuario._user_updated = context.id_usuario;
        args.usuario._updated_at = new Date();
        args.usuario.id = args.id;
        let item = await UsuarioService.update(args.usuario);
        return res(item);
      },
      usuarioDelete: async (_, args, context) => {
        permissions(context, 'usuarios:delete');

        let deleted = await UsuarioService.deleteItem(args.id);
        return { deleted: res(deleted) };
      }
    }
  };
};
