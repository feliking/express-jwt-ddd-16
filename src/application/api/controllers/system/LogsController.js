'use strict';

const debug = require('debug')('app:controller:token');
const { userData, generateTokenInfinite } = require('../../../lib/auth');

module.exports = function setupLogsController (services) {
  const { TokenService, Log } = services;

  async function listarLogs (req, res, next) {
    debug('listando logs (sistema de archivos)');

    let user = await userData(req, services);
    let data = req.body;

    try {
      let result = await Log.findAll(data);
      // preparando el tipo de respuesta
      let respuesta;
      if (Log.logsConfig) {
        if (Log.logsConfig.storage == 'filesystem') {
          respuesta = {
            datos: {
              count: result.data.count,
              datos: result.data.rows
            }
          };
        } else {
          respuesta = {
            count: result.data.count,
            datos: {
              logs: result.data.rows
            }
          };
        }
      } else {
        respuesta = {
          count: result.count,
          datos: {
            logs: result.rows
          }
        };
      }
      res.send(respuesta);
    } catch (e) {
      return next(e);
    }
  };
  
  return {
    listarLogs
  };
};
