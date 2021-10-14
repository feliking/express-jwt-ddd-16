'use strict';

module.exports = function setupValidationRoute (api, controllers) {
  const { ValidationController } = controllers;

  api.get('/validation', ValidationController.getValidation);

  return api;
};
