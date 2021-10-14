'use strict';

const debug = require('debug')('app:controller:auth');

module.exports = function setupAuthController (services) {
  async function getValidation (req, res, next) {
    const { context, model } = req.query;
    debug(`Obteniendo validación del context/model: ${context}/${model} `);

    if (!context) {
      return res.status(412).send({ error: `Debe envíar el parámetro context` });
    }

    if (!model) {
      return res.status(412).send({ error: `Debe envíar el parámetro model` });
    }

    if (services.validations[context]) {
      if (services.validations[context][model]) {
        try {
          let errors = [];
          let validations = {};
          let classes = services.validations[context][model];
          for (let key in classes) {
            let field = new classes[key](undefined, errors);
            let data = {
              type: field.type.name.toLowerCase(),
              rules: field.rules
            };
            if (field.required) {
              data.required = true;
            }
            validations[field.name] = data;
          }
          res.send(validations);
        } catch (error) {
          return res.status(412).send({ error: error.message });
        }
      } else {
        return res.status(412).send({ error: `No existe el model: ${model}` });
      }
    } else {
      return res.status(412).send({ error: `No existe el módulo: ${context}` });
    }
  }

  return {
    getValidation
  };
};
