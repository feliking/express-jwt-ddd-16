'use strict';

const test = require('ava');
const { errors, config } = require('../../common');
const domain = require('../');
const { text } = require('../../common');

let services;

test.beforeEach(async () => {
  if (!services) {
    services = await domain(config.db).catch(errors.handleFatalError);
  }
});

test.serial('UsuarioService#findAll', async t => {
  const { UsuarioService } = services;
  let res = await UsuarioService.findAll();

  t.is(res.code, 1, 'Respuesta correcta');
  t.true(res.data.count > 10, 'Se tiene 10 registros en la bd');
  t.is(res.message, 'OK', 'Mensaje correcto');
});

test.serial('UsuarioService#findById', async t => {
  const { UsuarioService } = services;
  const id = 1;

  let res = await UsuarioService.findById(id);

  t.is(res.code, 1, 'Respuesta correcta');
  t.is(res.data.id, id, 'Se recuperó el registro mediante un id');
  t.is(res.message, 'OK', 'Mensaje correcto');
});

test.serial('UsuarioService#userExist - exist', async t => {
  const { UsuarioService } = services;
  const usuario = 'admin';
  const password = '123456';

  let res = await UsuarioService.userExist(usuario, password);

  t.is(res.code, 1, 'Respuesta correcta');
  t.is(res.data.usuario, usuario, 'Se verificó la existencia del usuario y contraseña');
  t.is(res.message, 'OK', 'Mensaje correcto');
});

test.serial('UsuarioService#userExist - not exist', async t => {
  const { UsuarioService } = services;
  const usuario = 'admin1234';
  const password = '123456';

  let res = await UsuarioService.userExist(usuario, password);

  t.is(res.code, -1, 'Respuesta incorrecta');
  t.is(res.message, `No existe el usuario ${usuario}`, 'Mensaje correcto');
});

test.serial('UsuarioService#userExist - password error', async t => {
  const { UsuarioService } = services;
  const usuario = 'admin';
  const password = '1234567';

  let res = await UsuarioService.userExist(usuario, password);
  t.is(res.code, -1, 'Respuesta incorrecta');
  t.is(res.message, `La contraseña del usuario ${usuario} es incorrecta`, 'Mensaje correcto');
});

test.serial('UsuarioService#createOrUpdate - new', async t => {
  const { UsuarioService } = services;
  let usuario = `admin${parseInt(Math.random() * 10000)}`;
  const nuevoUsuario = {
    usuario,
    contrasena: '123A56B8a*',
    email: `${usuario}@mail.com`,
    estado: 'ACTIVO',
    id_rol: 1,
    id_entidad: 1,
    _user_created: 1,
    _created_at: new Date(),
    nombres: 'Juan',
    primer_apellido: 'Flores',
    segundo_apellido: 'Ramirez',
    nombre_completo: '',
    tipo_documento: 'CI',
    tipo_documento_otro: '',
    nro_documento: '123456',
    fecha_nacimiento: new Date(1990, 0, 1) + '',
    movil: '123',
    nacionalidad: 'BOLIVIA',
    pais_nacimiento: 'BOLIVIA',
    genero: 'M',
    telefono: '456'
  };

  let res = await UsuarioService.createOrUpdate(nuevoUsuario);
  usuario = res.data;

  t.is(res.code, 1, 'Respuesta correcta');
  t.true(typeof usuario.id === 'number', 'Comprobando que el nuevo usuario tenga un id');
  t.is(usuario.usuario, nuevoUsuario.usuario, 'Creando registro - usuario');
  t.is(usuario.email, nuevoUsuario.email, 'Creando registro - email');
  t.true(await text.compare(nuevoUsuario.contrasena, usuario.contrasena), 'Creando registro - contraseña');
  t.is(res.message, 'OK', 'Mensaje correcto');

  test.idUser = usuario.id;
});

test.serial('UsuarioService#createOrUpdate - update', async t => {
  const { UsuarioService } = services;
  let usuario = `admin${parseInt(Math.random() * 10000)}`;
  const newData = {
    id: test.idUser,
    usuario,
    id_persona: 1,
    nombres: 'Juan',
    id_rol: 1,
    id_entidad: 1
  };

  let res = await UsuarioService.createOrUpdate(newData);
  t.is(res.code, 1, 'Respuesta correcta');
  t.is(res.data.usuario, newData.usuario, 'Actualizando registro usuario');
  t.is(res.message, 'OK', 'Mensaje correcto');
});

test.serial('UsuarioService#findAll#filter#usuario', async t => {
  const { UsuarioService } = services;
  let res = await UsuarioService.findAll({ usuario: 'admin' });
  let lista = res.data;

  t.is(res.code, 1, 'Respuesta correcta');
  t.is(lista.count, 2, 'Se tiene 2 registros en la bd');
  t.is(res.message, 'OK', 'Mensaje correcto');
});

test.serial('UsuarioService#findAll#filter#id_persona', async t => {
  const { UsuarioService } = services;
  let res = await UsuarioService.findAll({ id_persona: 1 });
  let lista = res.data;

  t.is(res.code, 1, 'Respuesta correcta');
  t.is(lista.count, 2, 'Se tiene 2 registros en la bd');
  t.is(res.message, 'OK', 'Mensaje correcto');
});

test.serial('UsuarioService#findAll#filter#email', async t => {
  const { UsuarioService } = services;
  let res = await UsuarioService.findAll({ email: 'admin' });
  let lista = res.data;

  t.is(res.code, 1, 'Respuesta correcta');
  t.is(lista.count, 2, 'Se tiene 2 registros en la bd');
  t.is(res.message, 'OK', 'Mensaje correcto');
});

test.serial('UsuarioService#findAll#filter#id_rol', async t => {
  const { UsuarioService } = services;
  let res = await UsuarioService.findAll({ id_rol: 1 });
  let lista = res.data;

  t.is(res.code, 1, 'Respuesta correcta');
  t.is(lista.count, 2, 'Se tiene 2 registros en la bd');
  t.is(res.message, 'OK', 'Mensaje correcto');
});

// Delete logically user
test.serial('UsuarioService#delete', async t => {
  const { UsuarioService } = services;
  let res = await UsuarioService.deleteItem(test.idUser);
  t.is(res.code, 1, 'Respuesta correcta');
  t.true(res.data, 'UsuarioService eliminado');
  t.is(res.message, 'OK', 'Mensaje correcto');
});
