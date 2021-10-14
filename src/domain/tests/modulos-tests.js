'use strict';

const test = require('ava');
const { errors, config } = require('../../common');
const domain = require('../');

let services;

test.beforeEach(async () => {
  if (!services) {
    services = await domain(config.db).catch(errors.handleFatalError);
  }
});

test.serial('ModuloService#getMenu', async t => {
  const { ModuloService } = services;
  let res = await ModuloService.getMenu();

  t.is(res.code, 1, 'Respuesta correcta');
  t.is(res.data.menu[0].url !== undefined, true, 'Se tiene armado el menú');
  t.is(res.message, 'OK', 'Mensaje correcto');
});

test.serial('ModuloService#findAll', async t => {
  const { ModuloService } = services;
  let res = await ModuloService.findAll();

  t.is(res.code, 1, 'Respuesta correcta');
  t.true(res.data.count > 5, 'Se tiene 19 registros en la bd');
  t.is(res.message, 'OK', 'Mensaje correcto');
});

test.serial('ModuloService#findById', async t => {
  const { ModuloService } = services;
  const id = 1;

  let res = await ModuloService.findById(id);

  t.is(res.code, 1, 'Respuesta correcta');
  t.is(res.data.id, id, 'Se recuperó el registro mediante un id');
  t.is(res.message, 'OK', 'Mensaje correcto');
});

test.serial('ModuloService#createOrUpdate - new', async t => {
  const { ModuloService } = services;
  const number = parseInt(Math.random() * 1000000) + 10000000;
  const nuevoModulo = {
    ruta: `/ruta_${number}`,
    label: `Nuevo label ${number}`,
    orden: number,
    estado: 'INACTIVO',
    visible: false,
    _user_created: 1,
    _created_at: new Date()
  };

  let res = await ModuloService.createOrUpdate(nuevoModulo);
  let modulo = res.data;

  t.is(res.code, 1, 'Respuesta correcta');
  t.true(typeof modulo.id === 'number', 'Comprobando que el nuevo modulo tenga un id');
  t.is(modulo.ruta, nuevoModulo.ruta, 'Creando registro - ruta');
  t.is(modulo.label, nuevoModulo.label, 'Creando registro - label');
  t.is(modulo.orden, nuevoModulo.orden, 'Creando registro - orden');
  t.is(modulo.estado, nuevoModulo.estado, 'Creando registro - estado');
  t.is(modulo.visible, nuevoModulo.visible, 'Creando registro - visible');

  t.is(res.message, 'OK', 'Mensaje correcto');

  test.idModulo = modulo.id;
});

test.serial('ModuloService#createOrUpdate - update', async t => {
  const { ModuloService } = services;
  const newData = {
    id: test.idModulo,
    label: 'Este es el nuevo label'
  };

  let res = await ModuloService.createOrUpdate(newData);

  t.is(res.code, 1, 'Respuesta correcta');
  t.is(res.data.label, newData.label, 'Actualizando registro ModuloService');
  t.is(res.message, 'OK', 'Mensaje correcto');
});

test.serial('ModuloService#findAll#filter - id_modulo', async t => {
  const { ModuloService } = services;
  let res = await ModuloService.findAll({ id_modulo: 1 });
  t.is(res.code, 1, 'Respuesta correcta');
  t.true(res.data.count > 5, 'Filtrando datos - id_modulo');
  t.is(res.message, 'OK', 'Mensaje correcto');
});

test.serial('ModuloService#findAll#filter - id_modulo - null', async t => {
  const { ModuloService } = services;
  let res = await ModuloService.findAll({ id_modulo: 0 });
  t.is(res.code, 1, 'Respuesta correcta');
  t.true(res.data.count > 1, 'Filtrando datos - id_modulo - null');
  t.is(res.message, 'OK', 'Mensaje correcto');
});

test.serial('ModuloService#findAll#filter - id_rol', async t => {
  const { ModuloService } = services;
  let res = await ModuloService.findAll({ id_rol: 1 });
  t.is(res.code, 1, 'Respuesta correcta');
  t.true(res.data.count >= 5, 'Filtrando datos - id_rol');
  t.is(res.message, 'OK', 'Mensaje correcto');
});

test.serial('ModuloService#delete', async t => {
  const { ModuloService } = services;
  let res = await ModuloService.deleteItem(test.idModulo);

  t.is(res.code, 1, 'Respuesta correcta');
  t.true(res.data, 'ModuloService eliminado');
  t.is(res.message, 'OK', 'Mensaje correcto');
});
