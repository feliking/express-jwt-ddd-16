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

test.serial('EntidadService#findAll', async t => {
  const { EntidadService } = services;
  let res = await EntidadService.findAll();

  t.is(res.code, 1, 'Respuesta correcta');
  t.is(res.data.count, 10, 'Se tiene 10 registros en la bd');
  t.is(res.message, 'OK', 'Mensaje correcto');
});

test.serial('EntidadService#findById', async t => {
  const { EntidadService } = services;
  const id = 1;

  let res = await EntidadService.findById(id);

  t.is(res.code, 1, 'Respuesta correcta');
  t.is(res.data.id, id, 'Se recuperó el registro mediante un id');
  t.is(res.message, 'OK', 'Mensaje correcto');
});

test.serial('EntidadService#createOrUpdate - new', async t => {
  const { EntidadService } = services;
  const nuevoEntidad = {
    nombre: 'Nombre entidad creada',
    descripcion: 'Aqui la descripcion',
    email: 'yoyo@gmail.com',
    telefonos: '4535345',
    direccion: 'Av x. Nro1234',
    web: 'http://dominio.gob.bo',
    estado: 'ACTIVO',
    _user_created: 1,
    _created_at: new Date()
  };

  let res = await EntidadService.createOrUpdate(nuevoEntidad);
  let entidad = res.data;

  t.is(res.code, 1, 'Respuesta correcta');
  t.true(typeof entidad.id === 'number', 'Comprobando que el nuevo entidad tenga un id');
  t.is(entidad.nombre, nuevoEntidad.nombre, 'Creando registro - nombre');
  t.is(entidad.descripcion, nuevoEntidad.descripcion, 'Creando registro - descripcion');
  t.is(entidad.email, nuevoEntidad.email, 'Creando registro - email');
  t.is(entidad.telefonos, nuevoEntidad.telefonos, 'Creando registro - telefonos');
  t.is(entidad.direccion, nuevoEntidad.direccion, 'Creando registro - direccion');
  t.is(entidad.web, nuevoEntidad.web, 'Creando registro - web');
  t.is(entidad.estado, nuevoEntidad.estado, 'Creando registro - estado');
  t.is(res.message, 'OK', 'Mensaje correcto');

  test.idEntidad = entidad.id;
});

test.serial('EntidadService#createOrUpdate - update', async t => {
  const { EntidadService } = services;
  const newData = {
    id: test.idEntidad,
    nombre: 'Nuevo nombre entidad'
  };

  let res = await EntidadService.createOrUpdate(newData);

  t.is(res.code, 1, 'Respuesta correcta');
  t.is(res.data.nombre, newData.nombre, 'Actualizando registro nombre');
  t.is(res.message, 'OK', 'Mensaje correcto');
});

test.serial('EntidadService#delete', async t => {
  const { EntidadService } = services;
  let res = await EntidadService.deleteItem(test.idEntidad);

  t.is(res.code, 1, 'Respuesta correcta');
  t.true(res.data, 'EntidadService eliminado');
  t.is(res.message, 'OK', 'Mensaje correcto');
});
