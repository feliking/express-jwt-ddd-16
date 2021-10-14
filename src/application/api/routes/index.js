'use strict';

const express = require('express');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const auth = require('express-jwt');
const { config } = require('../../../common');
const { loadRoutes } = require('../../lib/util');
const api = express.Router();

module.exports = function setupApi (controllers) {
  // Cargando rutas automáticamente
  let files = fs.readdirSync(__dirname);
  files.forEach(function (file) {
    let pathFile = path.join(__dirname, file);
    if (fs.statSync(pathFile).isDirectory()) {
      if (file !== 'public') { // Agregando Autenticación excepto a las rutas de la carpeta public
        api.use(`/${file}/*`, auth(config.auth));
      }
      let router = express.Router();
      let doc = loadRoutes(pathFile, null, controllers, router);
      api.use(`/${file}`, router);
      console.log('🚀  ' + chalk.yellow('RUTAS: ') + chalk.redBright(file.toUpperCase()));
      for (let i in doc) {
        doc[i].url = `/api/${file}${doc[i].url}`;
        console.log(' -', doc[i]);
      }
    }
  });

  return api;
};
