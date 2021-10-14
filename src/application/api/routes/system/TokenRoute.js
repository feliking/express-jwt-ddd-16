'use strict';

const guard = require('express-jwt-permissions')();

module.exports = function setupUsuario (api, controllers) {
  const { TokenController } = controllers;

  api.post('/token/generar', guard.check(['usuarios:read']), TokenController.generarToken);

  return api;
};
