'use strict';

const csvToJson = require('csvtojson');
const { bufferToStream, createObject } = require('./util');

function csv (file, headers) {
  return new Promise((resolve, reject) => {
    let items = [];
    let message = null;
    csvToJson().fromStream(bufferToStream(file))
      .on('header', header => {
        if (header.length !== headers.length) {
          message = `El número de cabeceras es incorrecto, tiene que tener ${headers.length} cabeceras: ${headers.join(', ')}.`;
        } else {
          for (let i in header) {
            if (header[i] !== headers[i]) {
              message = `La cabecera ${header[i]} no es correcta debería ser ${headers[i]}.`;
              break;
            }
          }
        }
      })
      .on('json', (item, index) => {
        items.push(createObject(headers, item));
      })
      .on('done', async (err) => {
        if (err) {
          return reject(new Error('Se produjo un error al leer el CSV'));
        }
        if (message) {
          return reject(new Error(message));
        } else {
          return resolve(items);
        }
      })
      .on('error', err => {
        return reject(err);
      });
  });
}

module.exports = {
  csv
};
