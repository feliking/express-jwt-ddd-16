'use strict';

const Sequelize = require('sequelize');
const Params = require('app-params');
const minimist = require('minimist');
const inquirer = require('inquirer');
const { errors, config } = require('../common');
const db = require('./');

const args = minimist(process.argv);
const prompt = inquirer.createPromptModule();

async function setup () {
  if (!args.yes) {
    const answer = await prompt([
      {
        type: 'confirm',
        name: 'setup',
        message: '¿Realmente quiere destruir y crear de nuevo la base de datos de la aplicación?'
      }
    ]);

    if (!answer.setup) {
      return console.log('Nothing happened :)');
    }
  }

  const configDB = config.db;
  configDB.setup = true; // Forzamos que la base de datos se cree desde cero

  await db(configDB).catch(errors.handleFatalError);

  // Cargando Parámetros
  configDB.force = true;
  await Params(configDB);

  let sequelize = new Sequelize(configDB);
  // Verificando conexión con la BD
  await sequelize.authenticate();
  try {
    let res = await sequelize.query('DELETE FROM sequelize_seeders;');
    console.info('Eliminando sequelize_seeders', res[1].rowCount);
  } catch (error) {
    console.error(error.message);
  }

  console.log('Success Infrastructure setup!');
  process.exit(0);
}

setup();
