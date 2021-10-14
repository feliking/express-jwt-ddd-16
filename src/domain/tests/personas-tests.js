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

test.serial('PersonaService#findAll', async t => {
  const { PersonaService } = services;
  let res = await PersonaService.findAll();

  t.is(res.code, 1, 'Respuesta correcta');
  t.true(res.data.count >= 10, 'Se tiene más de 10 registros en la bd');
  t.is(res.message, 'OK', 'Mensaje correcto');
});

test.serial('PersonaService#findById', async t => {
  const { PersonaService } = services;
  const id = 1;

  let res = await PersonaService.findById(id);

  t.is(res.code, 1, 'Respuesta correcta');
  t.is(res.data.id, id, 'Se recuperó el registro mediante un id');
  t.is(res.message, 'OK', 'Mensaje correcto');
});

test.serial('PersonaService#createOrUpdate - new', async t => {
  const { PersonaService } = services;
  let persona = `admin-${parseInt(Math.random() * 10000)}`;
  const nuevoPersona = {
    nombres: 'Administrador',
    primer_apellido: 'Administrador',
    estado: 'ACTIVO',
    _user_created: 1,
    _created_at: new Date()
  };

  let res = await PersonaService.createOrUpdate(nuevoPersona);
  persona = res.data;

  t.is(res.code, 1, 'Respuesta correcta');
  t.true(typeof persona.id === 'number', 'Comprobando que el nuevo persona tenga un id');
  t.is(persona.persona, nuevoPersona.persona, 'Creando registro - persona');
  t.is(persona.contrasena, nuevoPersona.contrasena, 'Creando registro - contraseña');
  t.is(persona.nombres, nuevoPersona.nombres, 'Creando registro - nombres');
  t.is(res.message, 'OK', 'Mensaje correcto');

  test.idUser = persona.id;
});

test.serial('PersonaService#createOrUpdate - update', async t => {
  const { PersonaService } = services;
  const newData = {
    id: test.idUser,
    segundo_apellido: 'Administrador'
  };

  let res = await PersonaService.createOrUpdate(newData);

  t.is(res.code, 1, 'Respuesta correcta');
  t.is(res.data.segundo_apellido, newData.segundo_apellido, 'Actualizando registro persona');
  t.is(res.message, 'OK', 'Mensaje correcto');
});

test.serial('PersonaService#findAll#filter#nombre_completo', async t => {
  const { PersonaService } = services;
  let res = await PersonaService.findAll({ nombre_completo: 'admin' });
  let lista = res.data;

  t.is(res.code, 1, 'Respuesta correcta');
  t.true(lista.count >= 1, 'Se tiene 2 registros en la bd');
  t.is(res.message, 'OK', 'Mensaje correcto');
});

// Delete logically user
test.serial('PersonaService#delete', async t => {
  const { PersonaService } = services;
  let res = await PersonaService.deleteItem(test.idUser);
  t.is(res.code, 1, 'Respuesta correcta');
  t.true(res.data, 'PersonaService eliminado');
  t.is(res.message, 'OK', 'Mensaje correcto');
});
