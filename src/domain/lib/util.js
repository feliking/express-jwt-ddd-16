'use strict';

const fs = require('fs');
const path = require('path');
const Response = require('./response');
const { array, config } = require('../../common');
let res;

/**
 * Cargando los repositorios en la carpeta especificada
 *
 * @param {string} PATH: Path del directorio de donde se cargará los modelos del sistema
 * @param {object} models: Objeto con todos los modelos de la bd
 * @param {object} res: objeto con respuestas predeterminadas
 * @param {object} opts: Json de configuración
 */
function loadServices (PATH, repositories, valueObjects, opts = {}, logs) {
  if (!res) {
    res = Response(logs);
  }
  let files = fs.readdirSync(PATH);
  let services = {};

  if (opts.exclude) {
    array.removeAll(opts.exclude, files);
  }

  // para excluir tambien expresiones regulares
  if (opts.excludeRegex) {
    let excluir = [];
    opts.excludeRegex.map((re) => {
      let regExp = new RegExp(re);
      files.map((file) => {
        if (regExp.test(file)) {
          excluir.push(file);
        }
      });
    });
    if (excluir.length > 0) {
      array.removeAll(excluir, files);
    }
  }
  
  files.forEach(function (file) {
    let pathFile = path.join(PATH, file);
    if (fs.statSync(pathFile).isDirectory()) {
      services = Object.assign(services, loadServices(pathFile, repositories, valueObjects, opts, logs));
    } else {
      file = file.replace('.js', '');
      services[file] = require(pathFile)(repositories, valueObjects, res);
    }
  });

  return services;
}

function loadClasses (PATH, opts) {
  let files = fs.readdirSync(PATH);
  let classes = {};

  if (opts.exclude) {
    array.removeAll(opts.exclude, files);
  }

  // para excluir tambien expresiones regulares
  if (opts.excludeRegex) {
    let excluir = [];
    opts.excludeRegex.map((re) => {
      let regExp = new RegExp(re);
      files.map((file) => {
        if (regExp.test(file)) {
          excluir.push(file);
        }
      });
    });
    if (excluir.length > 0) {
      array.removeAll(excluir, files);
    }
  }

  files.forEach(function (file) {
    let pathFile = path.join(PATH, file);
    if (fs.statSync(pathFile).isDirectory()) {
      classes = Object.assign(classes, loadClasses(pathFile, opts));
    } else {
      file = file.replace('.js', '');
      classes[file] = require(pathFile);
    }
  });

  return classes;
}

function loadValidations (PATH, opts) {
  let files = fs.readdirSync(PATH);
  let valueObjects = {};

  if (opts.exclude) {
    array.removeAll(opts.exclude, files);
  }

  // para excluir tambien expresiones regulares
  if (opts.excludeRegex) {
    let excluir = [];
    opts.excludeRegex.map((re) => {
      let regExp = new RegExp(re);
      files.map((file) => {
        if (regExp.test(file)) {
          excluir.push(file);
        }
      });
    });
    if (excluir.length > 0) {
      array.removeAll(excluir, files);
    }
  }

  files.forEach(function (file) {
    let pathFile = path.join(PATH, file);
    if (fs.statSync(pathFile).isDirectory()) {
      valueObjects[file] = loadValidations(pathFile, opts);
    } else {
      file = file.replace('.js', '');
      valueObjects[file] = require(pathFile);
    }
  });

  return valueObjects;
}

const iss = {
  issuer: `${config.openid.issuer}`,
  authorization_endpoint: `${config.openid.issuer}/auth`,
  token_endpoint: `${config.openid.issuer}/token`,
  revocation_endpoint: `${config.openid.issuer}/revocation`,
  registration_endpoint: `${config.openid.issuer}/reg`,
  userinfo_endpoint: `${config.openid.issuer}/me`,
  introspection_endpoint: `${config.openid.issuer}/token/introspection`,
  check_session_iframe: `${config.openid.issuer}/session/check`,
  end_session_endpoint: `${config.openid.issuer}/session/end`,
  jwks_uri: `${config.openid.issuer}/certs`
};

module.exports = {
  loadServices,
  loadClasses,
  loadValidations,
  iss
};
