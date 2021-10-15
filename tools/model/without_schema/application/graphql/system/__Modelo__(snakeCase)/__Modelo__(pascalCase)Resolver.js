"use strict";

module.exports = function setupResolver(services, res) {
  const { __Modelo__(pascalCase)Service } = services;

  return {
    Query: {
      __Modelo__(camelCase)s: async (_, args, context) => {
        let items = await __Modelo__(pascalCase)Service.findAll(args);
        return res(items);
      },
      __Modelo__(camelCase): async (_, args, context) => {
        let item = await __Modelo__(pascalCase)Service.findById(args.id);
        return res(item);
      }
    },
    Mutation: {
      __Modelo__(camelCase)Add: async (_, args, context) => {
        args.__Modelo__(snakeCase)._created_at = new Date();
        args.__Modelo__(snakeCase)._user_created = context.id_usuario;
        let item = await __Modelo__(pascalCase)Service.createOrUpdate(args.__Modelo__(snakeCase));
        return res(item);
      },
      __Modelo__(camelCase)Edit: async (_, args, context) => {
        args.__Modelo__(snakeCase)._user_updated = context.id_usuario;
        args.__Modelo__(snakeCase)._updated_at = new Date();
        args.__Modelo__(snakeCase).id = args.id;
        let item = await __Modelo__(pascalCase)Service.createOrUpdate(args.__Modelo__(snakeCase));
        return res(item);
      },
      __Modelo__(camelCase)Delete: async (_, args, context) => {
        let deleted = await __Modelo__(pascalCase)Service.deleteItem(args.id);
        return { deleted: res(deleted) };
      },
    },
  };
};
