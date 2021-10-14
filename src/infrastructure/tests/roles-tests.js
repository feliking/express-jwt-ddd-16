'use strict';

const test = require('ava');
const { config, errors } = require('../../common');
const db = require('../');

let repositories;

test.beforeEach(async () => {
  if (!repositories) {
    repositories = await db(config.db).catch(errors.handleFatalError);
  }
});

test.serial('Rol#findAll', async t => {
  const { RolRepository } = repositories;
  let lista = await RolRepository.findAll();

  t.true(lista.count >= 2, 'Se tiene 2 registros en la bd');
});

test.serial('Rol#findById', async t => {
  const { RolRepository } = repositories;
  const id = 1;

  let rol = await RolRepository.findById(id);

  t.is(rol.id, id, 'Se recuperó el registro mediante un id');
});

test.serial('Rol#createOrUpdate - new', async t => {
  const { RolRepository } = repositories;
  const nuevoRol = {
    nombre: 'ROL_TEST',
    descripcion: 'Rol de prueba',
    _user_created: 1,
    _created_at: new Date()
  };
  let rol = await RolRepository.createOrUpdate(nuevoRol);
  t.true(typeof rol.id === 'number', 'Comprobando que el nuevo rol tenga un id');
  t.is(rol.nombre, nuevoRol.nombre, 'Creando registro - nombre');
  t.is(rol.descripcion, nuevoRol.descripcion, 'Creando registro - descripcion');

  test.idRol = rol.id;
});

test.serial('Rol#createOrUpdate - exists', async t => {
  const { RolRepository } = repositories;
  const newData = { id: test.idRol, nombre: 'ROL_NUEVO' };

  let rol = await RolRepository.createOrUpdate(newData);

  t.is(rol.nombre, newData.nombre, 'Actualizando registro rol');
});

test.serial('Rol#delete', async t => {
  const { RolRepository } = repositories;
  let deleted = await RolRepository.deleteItem(test.idRol);

  t.is(deleted, 1, 'Rol eliminado');
});
