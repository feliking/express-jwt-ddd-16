'use strict';

const Repository = require('../Repository');

module.exports = function authRepository (models) {
  const { auth } = models;

  return {
    findOne: (params) => Repository.findOne(params, auth),
    createOrUpdate: (item, t) => Repository.createOrUpdate(item, auth, t)
  };
};
