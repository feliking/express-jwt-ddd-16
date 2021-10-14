'use strict';

const debug = require('debug')('app:api');
const chalk = require('chalk');
const routes = require('./routes');
const { loadControllers } = require('../lib/util');
const path = require('path');

module.exports = async function setupApi (app, services) {
  debug('Iniciando API-REST');

  // Load controllers
  const controllers = loadControllers(path.join(__dirname, 'controllers'), services);

  // Load routes
  app.use('/api', routes(controllers));

  // login Route
  console.log('🚀  ' + chalk.yellow('RUTAS: ') + chalk.redBright('AUTH'));
  console.log(' -', { method: 'POST', url: '/auth' });
  app.post('/auth', controllers.AuthController.login);

  return app;
};
