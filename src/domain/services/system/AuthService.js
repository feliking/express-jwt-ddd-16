'use strict';

const debug = require('debug')('app:service:auth');
const crypto = require('crypto');
const Issuer = require('openid-client').Issuer;
// const jose = require('node-jose');
const moment = require('moment');
const url = require('url');
const { config } = require('../../../common');
const { iss } = require('../../lib/util');

// Métodos para CIUDADANÍA DIGITAL
module.exports = function authService (repositories, valueObjects, res) {
  const UsuarioService = require('./UsuarioService')(repositories, valueObjects, res);
  const { AuthRepository, UsuarioRepository } = repositories;
  const issuer = new Issuer(iss);
  // console.log('---------------------------- issuer', issuer);
  // const keystore = jose.JWK.createKeyStore();
  const cliente = new issuer.Client(config.openid.client);
  cliente.CLOCK_TOLERANCE = 5;

  async function getCode (data) {
    debug('Obtener código state');
    const state = crypto.randomBytes(16).toString('hex');
    const nonce = crypto.randomBytes(16).toString('hex');

    try {
      const authorizationRequest = Object.assign({
        redirect_uri: config.openid.client.redirect_uris[0],
        state,
        nonce
      }, config.openid.client_params);

      const authorizeUrl = cliente.authorizationUrl(authorizationRequest);

      const data = {
        state,
        parametros: {
          nonce
        },
        _user_created: 1
      };
      await AuthRepository.createOrUpdate(data);

      return res.success({
        url: authorizeUrl,
        codigo: state
      });
    } catch (e) {
      return res.error(e);
    }
  }

  async function authorizate (req, info) {
    debug('Autorizar código');
    let user;
    let respuesta;
    try {
      const params = cliente.callbackParams(req);
      if (!params.state) {
        throw new Error('Parámetro state es requerido.');
      }
      if (!params.code) {
        throw new Error('Parámetro code es requerido.');
      }
      const parametros = {
        state: params.state,
        estado: 'INICIO'
      };
      const resultadoState = await AuthRepository.findOne(parametros);

      if (resultadoState) {
        // obtenemos el code
        const respuestaCode = await cliente.callback(cliente.redirect_uris[0], params, {
          nonce: resultadoState.parametros.nonce,
          state: resultadoState.state
        });
        resultadoState.tokens = respuestaCode;

        const claims = await cliente.userinfo(respuestaCode);
        // const claims = respuestaCode.userinfo(respuesta);
        claims.fecha_nacimiento = moment(claims.fecha_nacimiento, 'DD/MM/YYYY').toDate();
        if (/[a-z]/i.test(claims.documento_identidad.numero_documento)) {
          claims.documento_identidad.complemento = claims.documento_identidad.numero_documento.slice(-2);
          claims.documento_identidad.numero_documento = claims.documento_identidad.numero_documento.slice(0, -2);
        }
        // console.log('-------------------------------claims', claims);
        const dataPersona = {
          tipo_documento: claims.documento_identidad.tipo_documento,
          nro_documento: claims.documento_identidad.numero_documento,
          // complemento: claims.documento_identidad.complemento,
          fecha_nacimiento: claims.fecha_nacimiento
        };
        const data = await UsuarioRepository.findByCi(dataPersona);
        if (data) {
          user = await UsuarioRepository.findByUsername(data.usuario);
          if (user.estado === 'ACTIVO') {
            respuesta = await UsuarioService.getResponse(user, info);
            resultadoState.id_usuario = user.id;
            resultadoState.estado = 'ACTIVO';
            await AuthRepository.createOrUpdate(resultadoState);
          } else { // usuario inactivo
            respuesta = {
              url: getUrl(resultadoState),
              mensaje: `El usuario no esta ACTIVO en el sistema. Consulte con el administrador del sistema.`
            };
          }
        } else { // no tiene acceso al sistema
          respuesta = {
            url: getUrl(resultadoState),
            mensaje: `La persona ${claims.nombre.nombres} no tiene acceso al sistema. Consulte con el administrador del sistema.`
          };
        }
        return res.success(respuesta);
      } else {
        return res.warning(new Error(`Los códigos de verificacion no coenciden. Intente nuevamente.`));
      }
    } catch (e) {
      return res.error(e);
    }
  }

  async function logout (code, usuario) {
    debug('Salir del sistema');
    let resultUrl;
    const urlExit = '/static/oauth/logout.html';
    try {
      const user = await UsuarioRepository.findByUsername(usuario, false);
      if (user) {
        const parametros = {
          state: code,
          id_usuario: user.id,
          estado: 'ACTIVO'
        };
        const result = await AuthRepository.findOne(parametros);
        if (result) {
          resultUrl = getUrl(result);
        } else {
          resultUrl = urlExit;
        }
      } else {
        resultUrl = urlExit;
      }
      return res.success({ url: resultUrl });
    } catch (e) {
      return res.error(e);
    }
  }

  function getUrl (data) {
    return url.format(Object.assign(url.parse(issuer.end_session_endpoint), {
      search: null,
      query: {
        id_token_hint: data.tokens.id_token,
        post_logout_redirect_uri: cliente.post_logout_redirect_uris[0]
      }
    }));
  }

  return {
    getCode,
    authorizate,
    logout
  };
};
