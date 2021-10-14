'use strict';

const bcrypt = require('bcrypt');
const saltRounds = 5;

function hashPassword (text) {
  return bcrypt.hash(text, saltRounds);
}

function compare (text, hash) {
  return bcrypt.compare(text, hash);
}

function nano (template, data) {
  // return template.replace(/\{([\w\.]*)\}/g, function (str, key) {
  return template.replace(/\{([\w.]*)\}/g, function (str, key) {
    let keys = key.split('.');
    let v = data[keys.shift()];
    for (let i = 0, l = keys.length; i < l; i++) { v = v[keys[i]]; }
    return (typeof v !== 'undefined' && v !== null) ? v : '';
  });
}

module.exports = {
  nano,
  hashPassword,
  compare
};
