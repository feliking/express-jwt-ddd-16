'use strict';

module.exports = function setupAuth (api, controllers) {
  const { AuthController } = controllers;

  api.get('/codigo', AuthController.codigo);
  api.get('/autorizar', AuthController.autorizar);
  api.post('/logout', AuthController.logout);

  return api;
};
