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
      },
    },
    Mutation: {

    },
  };
};
