'use strict';

const create = require('./handlers/create');
const get = require('./handlers/get');
const query = require('./handlers/query');
const remove = require('./handlers/remove');
const update = require('./handlers/update');
const formly = require('./handlers/formly');

const methods = {
  'post': {
    params: '',
    function: 'create'
  },
  'get-single': {
    params: '/:id',
    function: 'get'
  },
  'get': {
    params: '',
    function: 'query'
  },
  'delete': {
    params: '/:id',
    function: 'remove'
  },
  'put': {
    params: '/:id',
    function: 'update'
  },
  'options': {
    params: '',
    function: 'formly'
  }
};

const crud = {
  create: create,
  get: get,
  query: query,
  remove: remove,
  update: update,
  formly: formly,
  init: init
};

function init (router, models, api = '/api/') {
  router.all(`${api}*`, function (req, res, next) {
    let method = req.method.toLowerCase();
    let url = req.url.split('/');
    let object = getObject(url[2]);
    let model = models[object];
    let type = method;

    if (method === 'get' && url.length === 4) {
      type = 'get-single';
    }
    router[method](api + object + methods[type].params || '', crud[methods[type].function](model));

    next(); // pass control to the next handler
  });
}

function getObject (url) {
  let pos = url.indexOf('?');
  if (pos !== -1) {
    return url.substring(0, pos);
  }
  return url;
}

module.exports = crud;
