'use strict';

const debug = require('debug')('app:controller:usuario');
const { userData, generateToken } = require('../../../lib/auth');
const moment = require('moment');

module.exports = function setupUsuarioController (services) {
  const { Iop, PersonaService, UsuarioService, ModuloService, Parametro } = services;

  async function personaSegip (req, res, next) {
    debug('Buscando persona en SEGIP');

    const { ci } = req.params;
    const { fechaNacimiento, complemento, db, tipoDoc = 'CI' } = req.query;

    let persona;
    try {
      if (db) {
        persona = await PersonaService.find({
          nro_documento: ci + (complemento ? '-' + complemento : ''),
          tipo_documento: tipoDoc,
          fecha_nacimiento: moment(fechaNacimiento, 'DD/MM/YYYY').format('YYYY-MM-DD')
        });
        if (persona.code === 1) {
          persona = persona.data;
          persona = {
            paterno: persona.primer_apellido,
            materno: persona.segundo_apellido,
            nombres: persona.nombres,
            nacionalidad: persona.nacionalidad,
            telefono: persona.telefono,
            movil: persona.movil,
            genero: persona.genero,
            id_persona: persona.id
          };
          persona = { persona };
        } else {
          if (process.env.SEGIP === 'true') {
            if (tipoDoc === 'CI') {
              persona = await Iop.segip.buscarPersona(ci, fechaNacimiento, complemento);
            } else {
              return res.send({ observacion: 'La persona no está registrada en el sistema, complete los datos para registrarla.' });
            }
          } else {
            return res.send({ observacion: 'La persona no está registrada en el sistema, complete los datos para registrarla.' });
          }
        }
      } else {
        if (process.env.SEGIP === 'true') {
          persona = await Iop.segip.buscarPersona(ci, fechaNacimiento, complemento);
        } else {
          return res.send({ warning: 'La validación con el SEGIP está deshabilitada.' });
        }
      }
    } catch (e) {
      return next(e);
    }

    console.log('Respuesta segip 1', persona);
    if (persona.error && persona.error.indexOf('observación') !== -1) {
      return res.send({ observacion: persona.error });
    }
    res.send(persona);
  }

  // cambiar contrasena
  async function cambiarPass (req, res, next) {
    debug('Cambiar contraseña de usuario');

    const { password, newPassword } = req.body;

    try {
      let _user = await userData(req, services);
      let user = await UsuarioService.userExist(_user.usuario, password);
      if (user.code === 1) {
        user = await UsuarioService.update({
          id: _user.id,
          contrasena: newPassword
        });
        if (user.code === 1) {
          res.send({ message: 'Contraseña cambiada correctamente' });
        } else {
          res.status(412).send({ error: user.data.message || user.data || 'No se puede cambiar la contraseña' });
        }
      } else {
        res.send({ error: 'Su contraseña anterior es incorrecta' });
      }
    } catch (e) {
      return next(e);
    }
  }

  // desactivar cuenta
  async function desactivarCuenta (req, res, next) {
    debug('Desactivar cuenta de usuario');

    const { password } = req.body;
    try {
      let _user = await userData(req, services);
      let user = await UsuarioService.userExist(_user.usuario, password);
      if (user.code === 1) {
        user = await UsuarioService.update({
          id: _user.id,
          estado: 'INACTIVO'
        });
        if (user.code === 1) {
          res.send({ message: '¡Cuenta desactivada!' });
        } else {
          res.status(412).send({ error: user.data.message || user.data || 'No se pudo desactivar la cuenta' });
        }
      } else {
        res.send({ error: 'Su contraseña es incorrecta' });
      }
    } catch (e) {
      return next(e);
    }
  }

  async function obtenerMenu (req, res, next) {
    debug('Obteniendo menú y permisos');

    let user = await userData(req, services);
    let menu;
    let token;
    let permisos = {};
    const { all } = req.query;

    try {
      // Obteniendo menu
      menu = await ModuloService.getMenu(user.id_rol, false, !!all);

      if (all) {
        return res.send({ menu: menu.data.menu });
      }
      let permissions = menu.data.permissions;
      menu = menu.data.menu;

      // Generando token
      token = await generateToken(Parametro, user.usuario, permissions);

      // Formateando permisos
      permissions.map(item => (permisos[item] = true));
    } catch (e) {
      return next(e);
    }

    res.send({
      permisos,
      menu,
      token
    });
  }

  async function regenerarPassword (req, res, next) {
    debug('Regenerando password');

    let user = await userData(req, services);
    const { id } = req.params;
    try {
      let result = await UsuarioService.regenerar(id, user.id);
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
    personaSegip,
    cambiarPass,
    desactivarCuenta,
    obtenerMenu,
    regenerarPassword
  };
};
