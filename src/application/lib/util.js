'use strict';

const fs = require('fs');
const path = require('path');
const Duplex = require('stream').Duplex;

function response (data) {
  if (data.code === -1) {
    throw new Error(data.message);
  } else {
    return data.data;
  }
}

function loadGraphqlFile (PATH, opts = {}, services) {
  let files = fs.readdirSync(PATH);

  let schemas = [];
  let queries = '';
  let mutations = '';
  let resolvers = {
    Query: {},
    Mutation: {}
  };

  if (opts.exclude) {
    removeAll(opts.exclude, files);
  }

  files.forEach(function (file) {
    let pathFile = path.join(PATH, file);
    if (fs.statSync(pathFile).isDirectory()) {
      const data = loadGraphqlFile(pathFile, opts, services);
      schemas = schemas.concat(data.schemas || []);
      queries += data.queries || '';
      mutations += data.mutations || '';
      if (data.resolvers) {
        if (data.resolvers.Query) {
          resolvers.Query = Object.assign(resolvers.Query, data.resolvers.Query);
        }
        if (data.resolvers.Mutation) {
          resolvers.Mutation = Object.assign(resolvers.Mutation, data.resolvers.Mutation);
        }
      }
    } else {
      if (file.lastIndexOf('Scheme') !== -1) {
        schemas.push(fs.readFileSync(pathFile, 'utf8'));
      } else if (file.lastIndexOf('Query') !== -1) {
        queries += fs.readFileSync(pathFile, 'utf8');
      } else if (file.lastIndexOf('Mutation') !== -1) {
        mutations += fs.readFileSync(pathFile, 'utf8');
      } else if (file.lastIndexOf('Resolver') !== -1) {
        const data = require(pathFile)(services, response);
        if (data.Query) {
          resolvers.Query = Object.assign(resolvers.Query, data.Query);
        }
        if (data.Mutation) {
          resolvers.Mutation = Object.assign(resolvers.Mutation, data.Mutation);
        }
      } else {
        console.log('ERROR GRAPHQL', `El archivo ${pathFile} debe terminar en Scheme, Query, Mutation o Resolver`);
      }
    }
  });

  return {
    schemas,
    queries,
    mutations,
    resolvers
  };
}

function loadControllers (PATH, services, opts = {}) {
  let files = fs.readdirSync(PATH);
  let controllers = {};

  if (opts.exclude) {
    // para excluir tambien expresiones regulares
    let excluir = [];
    opts.exclude.map(re => {
      let regExp = new RegExp(re);
      files.map((file) => {
        if (regExp.test(file)) {
          excluir.push(file);
        }
      });
    });
    removeAll(excluir, files);
  }

  files.forEach(function (file) {
    let pathFile = path.join(PATH, file);
    if (fs.statSync(pathFile).isDirectory()) {
      controllers = Object.assign(controllers, loadControllers(pathFile, services, opts));
    } else {
      file = file.replace('.js', '');
      controllers[file] = require(pathFile)(services);
    }
  });

  return controllers;
}

/**
 *
 * @param {array} elements: Array de elementos a eliminar de 'list'
 * @param {array} list: Array de elementos
 */
function removeAll (elements, list) {
  var ind;

  for (var i = 0, l = elements.length; i < l; i++) {
    while ((ind = list.indexOf(elements[i])) > -1) {
      list.splice(ind, 1);
    }
  }
}

function mergeGraphql (origin, graphql, scalars = []) {
  origin.schemes = origin.schemes.concat(graphql.schemes);
  origin.queries.Query += graphql.queries.Query;
  origin.queries.Mutation += graphql.queries.Mutation;
  origin.resolvers.Query = Object.assign(origin.resolvers.Query, graphql.resolvers.Query);
  origin.resolvers.Mutation = Object.assign(origin.resolvers.Mutation, graphql.resolvers.Mutation);

  for (let i in scalars) {
    origin.resolvers[scalars[i]] = graphql.resolvers[scalars[i]];
  }
  return origin;
}

/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
function isObject (item) {
  return (item && typeof item === 'object' && !Array.isArray(item));
}

/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 */
function mergeDeep (target, ...sources) {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return mergeDeep(target, ...sources);
}

function mergeDeepAll (array) {
  let obj = {};
  for (let i in array) {
    obj = mergeDeep(obj, array[i]);
  }
  return obj;
}

function loadRoutes (PATH, opts = {}, services, routes) {
  let files = fs.readdirSync(PATH);
  let doc = [];

  if (opts && opts.exclude) {
    removeAll(opts.exclude, files);
  }

  files.forEach(function (file) {
    let pathFile = path.join(PATH, file);
    if (fs.statSync(pathFile).isDirectory()) {
      doc = doc.concat(loadRoutes(pathFile, opts, services, routes));
    } else {
      routes = require(pathFile)(routes, services);
      doc = doc.concat(getRoutesApi(pathFile));
    }
  });

  return doc;
}

function getRoutesApi (pathFile) {
  let content = (fs.readFileSync(pathFile, 'utf8')).split('\n').map(line => line.trim());
  content = content.filter(text => text.indexOf('api.') === 0);
  let routes = [];
  content.map(text => {
    text = text.substring(4);
    let pos = text.indexOf('(');
    let method = text.substring(0, pos).toUpperCase();
    text = text.substring(pos + 2);
    pos = text.indexOf('\'');
    if (pos === -1) {
      pos = text.indexOf('"');
    }
    let url = text.substring(0, pos);
    routes.push({
      method,
      url
    });
  });

  return routes;
}

function bufferToStream (buffer) {
  let stream = new Duplex();
  stream.push(buffer);
  stream.push(null);
  return stream;
}

function createObject (headers, data) {
  let newObject = {};
  for (let i in headers) {
    newObject[headers[i].toLowerCase()] = data[headers[i]] || '';
  }
  return newObject;
}

module.exports = {
  mergeGraphql,
  mergeDeepAll,
  loadRoutes,
  bufferToStream,
  createObject,
  loadGraphqlFile,
  loadControllers,
  response
};
