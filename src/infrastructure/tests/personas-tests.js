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

test.serial('Persona#findAll', async t => {
  const { PersonaRepository } = repositories;
  let lista = await PersonaRepository.findAll();

  t.true(lista.count >= 10, 'Se tiene mayor o igual a 10 registros en la bd');
});

test.serial('Persona#findById', async t => {
  const { PersonaRepository } = repositories;
  const id = 1;

  let persona = await PersonaRepository.findById(id);

  t.is(persona.id, id, 'Se recuperó el registro mediante un id');
});

test.serial('Persona#createOrUpdate - new', async t => {
  const { PersonaRepository } = repositories;
  let persona = `admin-${parseInt(Math.random() * 10000)}`;
  const nuevoPersona = {
    nombres: 'Persona',
    primer_apellido: 'Prueba',
    segundo_apellido: '',
    nombre_completo: 'Administrador del sistema',
    tipo_documento: 'CI',
    tipo_documento_otro: '',
    nro_documento: '1234567',
    fecha_nacimiento: new Date(1990, 0, 1),
    telefono: '123456',
    movil: '70012345',
    nacionalidad: 'BOLIVIANA',
    pais_nacimiento: 'BOLIVIA',
    genero: 'F',
    estado: 'ACTIVO',
    _user_created: 1,
    _created_at: new Date()
  };

  persona = await PersonaRepository.createOrUpdate(nuevoPersona);

  t.true(typeof persona.id === 'number', 'Comprobando que el nuevo persona tenga un id');
  t.is(persona.nombres, nuevoPersona.nombres, 'Creando registro - nombres');
  t.is(persona.primer_apellido, nuevoPersona.primer_apellido, 'Creando registro - primer apellido');
  t.is(persona.telefono, nuevoPersona.telefono, 'Creando registro - telefono');
  t.is(persona.movil, nuevoPersona.movil, 'Creando registro - movil');

  test.idUser = persona.id;
});

test.serial('Persona#createOrUpdate - update', async t => {
  const { PersonaRepository } = repositories;
  let persona = `admin-${parseInt(Math.random() * 10000)}`;
  const newData = {
    id: test.idUser,
    nombres: 'Juan',
    segundo_apellido: 'Administrador',
    nombre_completo: 'Administrador del sistema',
    id_rol: 1
  };

  persona = await PersonaRepository.createOrUpdate(newData);

  t.is(persona.segundo_apellido, newData.segundo_apellido, 'Actualizando registro persona');
});

test.serial('Persona#findAll#filter#nombre_completo', async t => {
  const { PersonaRepository } = repositories;
  let lista = await PersonaRepository.findAll({ nombre_completo: 'juan' });

  t.true(lista.count >= 1, 'Se tiene 1 registros en la bd');
});

test.serial('Persona#findAll#filter#telefono', async t => {
  const { PersonaRepository } = repositories;
  let lista = await PersonaRepository.findAll({ telefono: '123456' });

  t.is(lista.count, 2, 'Se tiene 2 registros en la bd');
});

test.serial('Persona#delete', async t => {
  const { PersonaRepository } = repositories;
  let deleted = await PersonaRepository.deleteItem(test.idUser);

  t.is(deleted, 1, 'Persona eliminado');
});
