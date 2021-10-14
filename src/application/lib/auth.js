'use strict';

const jwt = require('jsonwebtoken');
const { config } = require('../../common');

function sign (payload, secret, callback) {
  return jwt.sign(payload, secret, callback);
}

function verify (token, secret, callback) {
  return jwt.verify(token, secret, callback);
}

function permissions (context, permission) {
  if (context.permissions) {
    let type;
    permission = permission.split('|');

    for (let i in permission) {
      if (context.permissions.indexOf(permission[i]) !== -1) {
        return true;
      } else {
        type = permission[i].split(':')[1].toUpperCase();
      }
    }
    throw new Error(`NOT_AUTHORIZED:${type || 'READ'}`);
  } else {
    throw new Error('NOT_AUTHORIZED:READ');
  }
}

async function generateToken (Parametro, usuario, permissions) {
  // Generando token
  let token;
  let exp = await Parametro.getParam('JWT_TOKEN_EXPIRATION');
  if (exp && exp.valor) {
    console.log('Tiempo del token en minutos:', exp.valor);
    exp = Math.floor(Date.now() / 1000) + (parseInt(exp.valor) * 60);
    token = await sign({
      usuario,
      permissions,
      exp
    }, config.auth.secret);
  } else {
    throw new Error('No existe el parámetro JWT_TOKEN_EXPIRATION');
  }

  return token;
}

function generateTokenInfinite (data) {
  return sign(data, config.auth.secret);
}

async function userData (req, services) {
  const { headers } = req;
  let user;

  if (headers.authorization) {
    try {
      let data = await verify(req.headers.authorization.replace('Bearer ', ''), config.auth.secret);
      const { UsuarioService } = services;
      user = await UsuarioService.getUser(data.usuario, false);
      return user.data;
    } catch (e) {
      throw new Error(`Error al crear el token: ${e.message}`);
    }
  }
}

module.exports = {
  sign,
  verify,
  permissions,
  generateToken,
  generateTokenInfinite,
  userData
};
