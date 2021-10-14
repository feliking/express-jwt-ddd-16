'use strict';

const guard = require('express-jwt-permissions')();

module.exports = function setupUsuario (api, controllers) {
  const { LogsController } = controllers;

  api.get('/logs/listar', guard.check(['logs:read']), LogsController.listarLogs);

  return api;
};
