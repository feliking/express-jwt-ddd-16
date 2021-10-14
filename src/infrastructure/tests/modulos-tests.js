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

test.serial('Modulo#findAll', async t => {
  const { ModuloRepository } = repositories;
  let lista = await ModuloRepository.findAll();

  t.true(lista.count > 7, 'Se tiene más de 7 registros en la bd');
});

test.serial('Modulo#findById', async t => {
  const { ModuloRepository } = repositories;
  const id = 1;

  let modulo = await ModuloRepository.findById(id);

  t.is(modulo.id, id, 'Se recuperó el registro mediante un id');
});

test.serial('Modulo#createOrUpdate - new', async t => {
  const { ModuloRepository } = repositories;
  const nuevoModulo = {
    ruta: '/home/dd',
    label: 'Nuevo label',
    orden: 78,
    estado: 'ACTIVO',
    visible: true,
    _user_created: 1,
    _created_at: new Date()
  };

  let modulo = await ModuloRepository.createOrUpdate(nuevoModulo);

  t.true(typeof modulo.id === 'number', 'Comprobando que el nuevo modulo tenga un id');
  t.is(modulo.ruta, nuevoModulo.ruta, 'Creando registro - ruta');
  t.is(modulo.label, nuevoModulo.label, 'Creando registro - label');
  t.is(modulo.orden, nuevoModulo.orden, 'Creando registro - orden');
  t.is(modulo.estado, nuevoModulo.estado, 'Creando registro - estado');
  t.is(modulo.visible, nuevoModulo.visible, 'Creando registro - visible');

  test.idModulo = modulo.id;
});

test.serial('Modulo#createOrUpdate - exists', async t => {
  const { ModuloRepository } = repositories;
  const newData = {
    id: test.idModulo,
    ruta: 'nueva_ruta'
  };

  let modulo = await ModuloRepository.createOrUpdate(newData);

  t.is(modulo.ruta, newData.ruta, 'Actualizando registro modulo');
});

test.serial('Modulo#findAll#filter', async t => {
  const { ModuloRepository } = repositories;
  let lista = await ModuloRepository.findAll({ label: 'Nuevo', estado: 'ACTIVO', visible: true });

  t.is(lista.count, 1, 'Filtrando datos');
});

test.serial('Modulo#findAll#filter - id_modulo', async t => {
  const { ModuloRepository } = repositories;
  let lista = await ModuloRepository.findAll({ id_modulo: 1 });

  t.true(lista.count > 5, 'Filtrando datos - id_modulo');
});

test.serial('Modulo#findAll#filter - id_modulo - null', async t => {
  const { ModuloRepository } = repositories;
  let lista = await ModuloRepository.findAll({ id_modulo: 0 });

  t.true(lista.count > 1, 'Filtrando datos - id_modulo - null');
});

test.serial('Modulo#delete', async t => {
  const { ModuloRepository } = repositories;
  let deleted = await ModuloRepository.deleteItem(test.idModulo);

  t.is(deleted, 1, 'modulo eliminado');
});
