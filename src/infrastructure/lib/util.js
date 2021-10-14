'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const casual = require('casual');
const lang = require('../lang');
const { array } = require('../../common');

/**
 * Carga los modelos de la carpeta especificada
 *
 * @param {string} PATH: Path del directorio de donde se cargará los modelos del sistema
 * @param {object} sequelize: Objeto Sequelize
 * @param {object} opts: Json de configuración permite excluir archivos con nombre exactamente igual `exclude' y con nombre que coincide con las expresiones regulares en la propiedad `excludeRegex'
 */
function loadModels (PATH, sequelize, opts = {}) {
  let files = fs.readdirSync(PATH);
  let models = {};

  if (opts.exclude) {
    array.removeAll(opts.exclude, files);
  }

  // para excluir archivos que cumplen la expresión regular
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
      models[file] = loadModels(pathFile, sequelize, opts);
    } else {
      file = file.replace('.js', '');
      // models[file] = sequelize.import(pathFile);
      models[file] = require(pathFile)(sequelize, Sequelize.DataTypes);
    }
  });

  return models;
}

/**
 * Cargando los repositorios en la carpeta especificada
 *
 * @param {string} PATH: Path del directorio de donde se cargará los modelos del sistema
 * @param {object} models: Objeto con todos los modelos de la bd
 * @param {object} opts: Json de configuración permite excluir archivos con nombre exactamente igual `exclude' y con nombre que coincide con las expresiones regulares en la propiedad `excludeRegex'
 */
function loadRepositories (PATH, models, Sequelize, opts = {}) {
  let files = fs.readdirSync(PATH);
  let repositories = {};

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
      repositories[file] = loadRepositories(pathFile, models, Sequelize, opts);
    } else {
      file = file.replace('.js', '');
      repositories[file] = require(pathFile)(models, Sequelize);
    }
  });

  return repositories;
}

const pk = {
  primaryKey: true,
  autoIncrement: true,
  type: Sequelize.INTEGER,
  xlabel: 'ID'
};

const timestamps = {
  _user_created: {
    type: Sequelize.INTEGER,
    allowNull: false,
    label: lang.t('fields._user_created')
  },
  _user_updated: {
    type: Sequelize.INTEGER,
    label: lang.t('fields._user_updated')
  },
  _created_at: {
    type: Sequelize.DATE,
    allowNull: false,
    label: lang.t('fields._created_at'),
    defaultValue: Sequelize.NOW
  },
  _updated_at: {
    type: Sequelize.DATE,
    xlabel: lang.t('fields._updated_at')
  }
};

function setTimestamps (fields) {
  return Object.assign(fields, timestamps);
}

function setTimestampsSeeder (arr, idUser = 1) {
  arr.map((el, index) => {
    arr[index] = Object.assign(el, {
      _user_created: idUser,
      _created_at: new Date(casual.date('YYYY-MM-DD') + ' ' + casual.time('HH:mm:ss'))
    });
  });

  return arr;
}

function getQuery (options = {}, excludeOrder = []) {
  let query = {};

  if (options.limit) {
    query.limit = options.limit;
    if (options.page) {
      query.offset = (options.page - 1) * options.limit;
    }
  }

  if (excludeOrder.indexOf(options.order ? options.order.replace('-', '') : null) === -1) {
    if (options.order) {
      if (options.order.startsWith('-')) {
        query.order = [[options.order.substring(1), 'DESC']];
      } else {
        query.order = [[options.order, 'ASC']];
      }
    }
  }

  return query;
}

function errorHandler (error) {
  if (error.errors) {
    let err = error.errors;
    let oError = {};
    for (let i in err) {
      let key = err[i].path;
      let type = err[i].type;
      let value = err[i].value;
      let message = '';

      if (['unique violation'].indexOf(type) !== -1) {
        if (type === 'unique violation') {
          message = `"${value}" ${lang.t('errors.validation.unique')}`;
        } else {
          message = `${type}:${err[i].message}`;
        }

        if (oError[key]) {
          oError[key].err.push(message);
        } else {
          oError[key] = {
            'errors': [message]
          };
        }
        oError[key].label = lang.t(`fields.${key}`);
      } else {
        console.log('Error de Validación desconocida');
        throw new Error(error.message);
      }
    }
    if (Object.keys(oError).length) {
      throw new Error(getText(oError));
    }
  }
  throw error;
}

function getText (oError) {
  let text = '';
  for (let key in oError) {
    text += '- ' + oError[key].label + ': ' + oError[key].errors.join(', ') + '.\n';
  }
  return text;
}

function convertLinealObject (data) {
  let ob = {};
  for (let i in data) {
    for (let j in data[i]) {
      ob[j] = data[i][j];
    }
  }
  return ob;
}

function toJSON (result) {
  let rows = [];
  let count = 0;
  if (result) {
    if (result.rows && Array.isArray(result.rows)) {
      result.rows.map(item => {
        rows.push(item.toJSON());
      });
    }
    count = result.count || 0;
  }
  return {
    count,
    rows
  };
}

module.exports = {
  loadModels,
  loadRepositories,
  pk,
  timestamps,
  setTimestamps,
  setTimestampsSeeder,
  getQuery,
  errorHandler,
  getText,
  convertLinealObject,
  toJSON
};
