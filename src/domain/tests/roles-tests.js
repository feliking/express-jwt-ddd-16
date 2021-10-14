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

test.serial('RolService#findAll', async t => {
  const { RolService } = services;
  let res = await RolService.findAll();

  t.is(res.code, 1, 'Respuesta correcta');
  t.true(res.data.count > 1, 'Se tiene 8 registros en la bd');
  t.is(res.message, 'OK', 'Mensaje correcto');
});

test.serial('RolService#findById', async t => {
  const { RolService } = services;
  const id = 1;

  let res = await RolService.findById(id);

  t.is(res.code, 1, 'Respuesta correcta');
  t.is(res.data.id, id, 'Se recuperó el registro mediante un id');
  t.is(res.message, 'OK', 'Mensaje correcto');
});

test.serial('RolService#createOrUpdate - new', async t => {
  const { RolService } = services;
  const nuevoRol = {
    nombre: 'Nombre de rol',
    descripcion: 'Descripcion de rol',
    _user_created: 1,
    _created_at: new Date()
  };

  let res = await RolService.createOrUpdate(nuevoRol);
  let rol = res.data;

  t.is(res.code, 1, 'Respuesta correcta');
  t.true(typeof rol.id === 'number', 'Comprobando que el nuevo rol tenga un id');
  t.is(rol.nombre, nuevoRol.nombre, 'Creando registro - nombre');
  t.is(rol.descripcion, nuevoRol.descripcion, 'Creando registro - descripcion');
  t.is(rol.tipo, nuevoRol.tipo, 'Creando registro - tipo');
  t.is(res.message, 'OK', 'Mensaje correcto');

  test.idRol = rol.id;
});

test.serial('RolService#createOrUpdate - update', async t => {
  const { RolService } = services;
  const newData = {
    id: test.idRol,
    nombre: 'Nuevo nombre de rol'
  };

  let res = await RolService.createOrUpdate(newData);

  t.is(res.code, 1, 'Respuesta correcta');
  t.is(res.data.nombre, newData.nombre, 'Actualizando registro nombre');
  t.is(res.message, 'OK', 'Mensaje correcto');
});

test.serial('RolService#delete', async t => {
  const { RolService, PermisoService } = services;
  
  // borrando el permisos asociados
  // TODO: revisar si de esta funcion no deberia encargarse RolService.deleteItem(test.idRol);
  let permisos = await PermisoService.findAll({ id_rol: test.idRol});
  for (let i=0; i<permisos.data.count; i++) {
    let permiso = permisos.data.rows[i];
    let res = await PermisoService.deleteItem(permiso.id);
  }
  let res = await RolService.deleteItem(test.idRol);

  t.is(res.code, 1, 'Respuesta correcta');
  t.true(res.data, 'RolService eliminado');
  t.is(res.message, 'OK', 'Mensaje correcto');
});
