'use strict';

const debug = require('debug')('app:controller:token');
const { userData, generateTokenInfinite } = require('../../../lib/auth');

module.exports = function setupUsuarioController (services) {
  const { TokenService } = services;

  async function generarToken (req, res, next) {
    debug('Generando nuevo token');

    let user = await userData(req, services);
    let data = req.body;

    try {
      let result = await TokenService.createOrUpdate(data, user.id, generateTokenInfinite);
      if (result.code === -1) {
        return next(new Error(result.message));
      }
      if (result.data) {
        res.send(result.data);
      } else {
        return next(new Error('No se pudo regenerar la contraseña.'));
      }
    } catch (e) {
      return next(e);
    }
  }

  return {
    generarToken
  };
};
