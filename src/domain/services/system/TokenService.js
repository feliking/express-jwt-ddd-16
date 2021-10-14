'use strict';

const debug = require('debug')('app:service:token');
const { mail } = require('../../../common');
const Service = require('../Service');

module.exports = function tokenService (repositories, valueObjects, res) {
  const { TokenRepository, UsuarioRepository, EntidadRepository } = repositories;
  const {
    TokenToken,
    TokenTipo,
    TokenEstado
  } = valueObjects;

  async function findAll (params = {}) {
    debug('Lista de tokens|filtros');

    return Service.findAll(params, TokenRepository, res, 'Tokens');
  }

  async function findById (id) {
    debug('Buscando token por ID');

    return Service.findById(id, TokenRepository, res, 'Token');
  }

  async function createOrUpdate (data, idUsuario, generateTokenInfinite) {
    debug('Crear o actualizar token', data);

    let datos = null;
    let result;
    try {
      if (data.tipo === 'USUARIO') {
        datos = await UsuarioRepository.findByUsername(data.usuario);
      }
      if (data.tipo === 'ENTIDAD') {
        datos = await EntidadRepository.findById(data.id_entidad);
      }

      if (datos) {
        data.id_usuario = data.tipo === 'USUARIO' ? datos.id : null;
      } else {
        return res.warning(new Error('ID no valido'));
      }

      data.token = await generateTokenInfinite(data);
      data._user_created = idUsuario;
      data.estado = 'ACTIVO';

      validate(data);

      result = await TokenRepository.createOrUpdate(data);

      if (result && datos.email) {
        await mail.enviar({
          para: [datos.email],
          asunto: 'Token de acceso - APP',
          contenido: `<br> Token de acceso tipo ${data.tipo}:<br><br><small>Revise el archivo adjunto.</small>`,
          adjuntoBase64: `data:text/plain;base64,${Buffer.from(data.token).toString('base64')}`
        });
      }
    } catch (e) {
      return res.error(e);
    }

    return res.success(result);
  }

  async function deleteItem (id) {
    debug('Eliminando token');

    return Service.deleteItem(id, TokenRepository, res, 'Token');
  }

  function validate (data) {
    Service.validate(data, {
      token: TokenToken,
      tipo: TokenTipo,
      estado: TokenEstado
    });
  }

  return {
    findAll,
    findById,
    createOrUpdate,
    deleteItem
  };
};
