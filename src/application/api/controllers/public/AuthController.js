'use strict';

const debug = require('debug')('app:controller:auth');
const config = require('../../../../common/config');

module.exports = function setupAuthController (services) {
  const { AuthService, UsuarioService } = services;

  async function login (req, res, next) {
    debug('Autenticación de usuario');

    const { contrasena, nit } = req.body;
    let { usuario } = req.body;
    let respuesta;

    try {
      if (!usuario || !contrasena) {
        return res.status(403).send({ error: 'El usuario y la contraseña son obligatorios' });
      }
      // Verificando que exista el usuario/contraseña
      let user = await UsuarioService.userExist(usuario, contrasena, nit);
      if (user.code === -1) {
        return res.status(403).send({ error: user.message });
      }
      user = user.data;
      respuesta = await UsuarioService.getResponse(user, req.ipInfo);
      // adicional para el modulo logs
      if (respuesta.permisos.hasOwnProperty('logs:read')) {
        respuesta.logsType = config.logs.storage;        
      }
    } catch (e) {
      return next(e);
    }
    res.send(respuesta);
  }

  async function codigo (req, res, next) {
    debug('Obtener código state');

    try {
      let result = await AuthService.getCode();

      if (result.code === -1) {
        return next(new Error(result.message));
      }
      if (result.data) {
        res.send(result.data);
      } else {
        return next(new Error('No se pudo generar el state code.'));
      }
    } catch (e) {
      return next(e);
    }
  }

  async function autorizar (req, res, next) {
    debug('Autorizar auth');
    if (req.query.error) {
      return next(new Error(req.query.error));
    } else {
      try {
        let result = await AuthService.authorizate(req, req.ipInfo);

        if (result.code === -1) {
          return next(new Error(result.message));
        }
        if (result.data) {
          res.send(result.data);
        } else {
          return next(new Error('No se pudo realizar la autorización de ingreso al sistema.'));
        }
      } catch (err) {
        return next(err);
      }
    }
  }

  async function logout (req, res, next) {
    debug('Salir del sistema');

    const { codigo, usuario } = req.body;
    try {
      let result = await AuthService.logout(codigo, usuario);
      if (result.code === 1) {
        res.send(result.data);
      } else {
        res.status(412).send({ error: result.data.message || 'No se pudo cerrar correctamente' });
      }
    } catch (e) {
      return next(e);
    }
  }

  return {
    login,
    logout,
    codigo,
    autorizar
  };
};
