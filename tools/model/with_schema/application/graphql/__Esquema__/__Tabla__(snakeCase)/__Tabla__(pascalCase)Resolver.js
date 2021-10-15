"use strict";

module.exports = function setupResolver(services, res) {
  const { __Tabla__(pascalCase)Service } = services;

  return {
    Query: {
      __Tabla__(camelCase)s: async (_, args, context) => {
        let items = await __Tabla__(pascalCase)Service.findAll(args);
        return res(items);
      },
      __Tabla__(camelCase): async (_, args, context) => {
        let item = await __Tabla__(pascalCase)Service.findById(args.id);
        return res(item);
      }
    },
    Mutation: {
      __Tabla__(camelCase)Add: async (_, args, context) => {
        args.__Tabla__(snakeCase)._created_at = new Date();
        args.__Tabla__(snakeCase)._user_created = context.id_usuario;
        let item = await __Tabla__(pascalCase)Service.createOrUpdate(args.__Tabla__(snakeCase));
        return res(item);
      },
      __Tabla__(camelCase)Edit: async (_, args, context) => {
        args.__Tabla__(snakeCase)._user_updated = context.id_usuario;
        args.__Tabla__(snakeCase)._updated_at = new Date();
        args.__Tabla__(snakeCase).id = args.id;
        let item = await __Tabla__(pascalCase)Service.createOrUpdate(args.__Tabla__(snakeCase));
        return res(item);
      },
      __Tabla__(camelCase)Delete: async (_, args, context) => {
        let deleted = await __Tabla__(pascalCase)Service.deleteItem(args.id);
        return { deleted: res(deleted) };
      },
    },
  };
};
