"use strict";

const debug = require("debug")("app:service:__Modelo__(snakeCase)");
const Service = require("../Service");

module.exports = function __Modelo__(camelCase)Service(repositories, valueObjects, res) {
  const { __Modelo__(pascalCase)Repository } = repositories;
  const {
		// Importación de value-objects(validaciones), ejemplo NombreModeloCampo
	} = valueObjects;

  async function findAll(params = {}) {
    debug("Lista de __Modelo__(pascalCase)|filtros");

    return Service.findAll(params, __Modelo__(pascalCase)Repository, res, "__Modelo__(pascalCase)");
  }

  async function findById(id) {
    debug("Buscando __Modelo__ por ID", id);

    return Service.findById(id, __Modelo__(pascalCase)Repository, res, "__Modelo__(pascalCase)");
  }

  async function createOrUpdate(data) {
    debug("Crear o actualizar __Modelo__");

    //validate(data); // Descomentar si se va a realizar una validación de campos

    return Service.createOrUpdate(data, __Modelo__(pascalCase)Repository, res, "__Modelo__(pascalCase)");
  }

  async function deleteItem(id) {
    debug("Eliminando __Modelo__");

    return Service.deleteItem(id, __Modelo__(pascalCase)Repository, res, "__Modelo__(pascalCase)");
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
