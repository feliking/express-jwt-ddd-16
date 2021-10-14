'use strict';

const debug = require('debug')('app:domain');
const db = require('../infrastructure');
const { config, errors } = require('../common');
const util = require('./lib/util');
const path = require('path');
const Logs = require('app-logs');
const Params = require('app-params');

module.exports = async function initDomain () {
  // Obteniendo repositorios de la capa de infrastructura
  let repositories = await db(config.db).catch(errors.handleFatalError);

  // Cargando Parámetros
  repositories.Parametro = await Params(config.db);

  // Iniciando el módulo de logs
  let logs;
  if (config.logs.storage === 'database') {
    logs = await Logs(config.db).catch(errors.handleFatalError);
  } else if (config.logs.storage === 'filesystem') {
    logs = await Logs({ logsConfig: config.logs }).catch(errors.handleFatalError);
  }

  repositories.Log = logs;

  // Cargando Value Objects que se encuentran en la carpeta value-object
  let valueObjects = util.loadClasses(path.join(__dirname, 'value-objects'),
    {
      exclude: ['index.js', 'ValueObject.js'],
      // para excluir archivos por expresión regular
      excludeRegex: [/[~|#]$/, /^(.#)/]
    });

  // Cargando Validaciones en base a los ValueObjects
  let validations = util.loadValidations(path.join(__dirname, 'value-objects'),
    {
      exclude: ['index.js', 'ValueObject.js'],
      excludeRegex: [/[~|#]$/, /^(.#)/]
    });

  // Cargando todos los servicios que se encuentran en la carpeta services y en sus subcarpetas, adjuntando logs
  let services = util.loadServices(path.join(__dirname, 'services'), repositories, valueObjects,
    {
      exclude: ['index.js', 'Service.js'],
      excludeRegex: [/[~|#]$/, /^(.#)/]
    }, logs);
  debug('Capa del dominio - Servicios cargados');

  // Asignando value objects a los servicios
  services.valueObjects = valueObjects;

  // Asignando validations de cada modelo del sistema
  services.validations = validations;

  // Asignando modelos y repositories de la capa de infrastructura
  services._models = repositories._models;
  services._repositories = repositories;

  return services;
};
