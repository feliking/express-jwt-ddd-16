'use strict';

const domain = require('../domain');
const Params = require('app-params');
const Logs = require('app-logs');
const { config, mail } = require('../common');
const Graphql = require('./graphql');
const { mergeGraphql } = require('./lib/util');

module.exports = async function setupModule (settings = { iop: true }) {
  try {
    // Cargando Capa del dominio
    let services = await domain(settings);

    // Agregando parámetros a los servicios
    services.Parametro = await Params(config.db);

    // Agregando Logs a los servicios
    if (config.logs.storage === 'database') {
      services.Log = await Logs(config.db);
    } else if (config.logs.storage === 'filesystem') {
      services.Log = await Logs({ logsConfig: config.logs });
    }

    // Cargando GRAPHQL
    let graphql = Graphql(services);

    // Uniendo Graphql de usuarios con Graphql de parámetros
    mergeGraphql(graphql, services.Parametro.graphql, ['DateP']);

    // Uniendo Graphql de usuarios con Graphql de Logs
    mergeGraphql(graphql, services.Log.graphql, ['DateL']);

    // Configurando el envio de email
    // mail.init(services);

    return {
      services,
      graphql,
      _models: services._models,
      _repositories: services._repositories
    };
  } catch (err) {
    console.error(err);
    throw new Error(`Error al instanciar el módulo principal: ${err.message}`);
  }
};
