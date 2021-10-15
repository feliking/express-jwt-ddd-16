"use strict";

const debug = require("debug")("app:service:__Tabla__(snakeCase)");
const Service = require("../Service");

module.exports = function __Tabla__(camelCase)Service(repositories, valueObjects, res) {
  const { __Tabla__(pascalCase)Repository } = repositories;
  const {
		// Importación de value-objects(validaciones), ejemplo NombreModeloCampo
	} = valueObjects;

  async function findAll(params = {}) {
    debug("Lista de __Tabla__(pascalCase)|filtros");

    return Service.findAll(params, __Tabla__(pascalCase)Repository, res, "__Tabla__(pascalCase)");
  }

  async function findById(id) {
    debug("Buscando __Tabla__ por ID", id);

    return Service.findById(id, __Tabla__(pascalCase)Repository, res, "__Tabla__(pascalCase)");
  }

  async function createOrUpdate(data) {
    debug("Crear o actualizar __Tabla__");

    //validate(data); // Descomentar si se va a realizar una validación de campos

    return Service.createOrUpdate(data, __Tabla__(pascalCase)Repository, res, "__Tabla__(pascalCase)");
  }

  async function deleteItem(id) {
    debug("Eliminando __Tabla__");

    return Service.deleteItem(id, __Tabla__(pascalCase)Repository, res, "__Tabla__(pascalCase)");
  }

  function validate(data) {
    Service.validate(data, {
      // Campos a validar, ejemplo: campo: NombreModeloCampo,
    });
  }

  return {
    findAll,
    findById,
    createOrUpdate,
    deleteItem,
  };
};
