'use strict';

const test = require('ava');
const { config, errors } = require('../../common');
const db = require('../');
const { text } = require('../../common');

let repositories;

test.beforeEach(async () => {
  if (!repositories) {
    repositories = await db(config.db).catch(errors.handleFatalError);
  }
});

test.serial('Usuario#findAll', async t => {
  const { UsuarioRepository } = repositories;
  let lista = await UsuarioRepository.findAll();

  t.truthy(lista.count >= 20, 'Se tiene al menos 20 registros en la bd');
});

test.serial('Usuario#findById', async t => {
  const { UsuarioRepository } = repositories;
  const id = 1;

  let usuario = await UsuarioRepository.findById(id);

  t.is(usuario.id, id, 'Se recuperó el registro mediante un id');
});

test.serial('Usuario#findByUsername', async t => {
  const { UsuarioRepository } = repositories;
  const username = 'admin';

  let usuario = await UsuarioRepository.findByUsername(username);

  t.is(usuario.usuario, username, 'Se recuperó el registro mediante un usuario');
});

test.serial('Usuario#createOrUpdate - new', async t => {
  const { UsuarioRepository } = repositories;
  let usuario = `admin-${parseInt(Math.random() * 10000)}`;
  const nuevoUsuario = {
    usuario,
    contrasena: await text.hashPassword('123456'),
    email: `${usuario}@mail.com`,
    estado: 'ACTIVO',
    cargo: 'Jefe',
    id_persona: 1,
    id_rol: 1,
    id_entidad: 1,
    _user_created: 1,
    _created_at: new Date()
  };

  usuario = await UsuarioRepository.createOrUpdate(nuevoUsuario);

  t.true(typeof usuario.id === 'number', 'Comprobando que el nuevo usuario tenga un id');
  t.is(usuario.usuario, nuevoUsuario.usuario, 'Creando registro - usuario');
  t.is(usuario.contrasena, nuevoUsuario.contrasena, 'Creando registro - contraseña');
  t.is(usuario.cargo, nuevoUsuario.cargo, 'Creando registro - cargo');

  test.idUser = usuario.id;
});

test.serial('Usuario#createOrUpdate - update', async t => {
  const { UsuarioRepository } = repositories;
  let usuario = `admin-${parseInt(Math.random() * 10000)}`;
  const newData = {
    id: test.idUser,
    usuario,
    id_rol: 1
  };

  usuario = await UsuarioRepository.createOrUpdate(newData);

  t.is(usuario.usuario, newData.usuario, 'Actualizando registro usuario');
});

test.serial('Usuario#findAll#filter#usuario', async t => {
  const { UsuarioRepository } = repositories;
  let lista = await UsuarioRepository.findAll({ usuario: 'admin' });

  t.is(lista.count, 2, 'Se tiene 2 registros en la bd');
});

test.serial('Usuario#findAll#filter#email', async t => {
  const { UsuarioRepository } = repositories;
  let lista = await UsuarioRepository.findAll({ email: 'admin' });

  t.is(lista.count, 2, 'Se tiene 2 registros en la bd');
});

test.serial('Usuario#findAll#filter#cargo', async t => {
  const { UsuarioRepository } = repositories;
  let lista = await UsuarioRepository.findAll({ cargo: 'Jefe' });

  t.is(lista.count, 1, 'Se tiene 1 registros en la bd');
});

test.serial('Usuario#findAll#filter#id_rol', async t => {
  const { UsuarioRepository } = repositories;
  let lista = await UsuarioRepository.findAll({ id_rol: 1 });

  t.is(lista.count, 2, 'Se tiene 2 registros en la bd');
});

test.serial('Usuario#delete', async t => {
  const { UsuarioRepository } = repositories;
  let deleted = await UsuarioRepository.deleteItem(test.idUser);

  t.is(deleted, 1, 'Usuario eliminado');
});
