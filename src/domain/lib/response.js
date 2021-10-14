'use strict';

module.exports = function setupResponse (logs) {
  function success (data, message) {
    return {
      code: 1,
      data,
      message: message || 'OK'
    };
  }

  async function error (error) {
    let data = {
      code: -1,
      data: process.env.NODE_ENV !== 'production' ? error : '',
      message: error.message || 'ERROR DESCONOCIDO'
    };

    let tipo = 'ERROR DOMINIO';
    if (error && error.SequelizeDatabaseError) {
      data.message = error.SequelizeDatabaseError;
      tipo = 'ERROR BD';
    }

    if (error.name && error.name === 'SequelizeDatabaseError') {
      tipo = 'ERROR BD';
    }

    await logs.error(data.message, tipo, error);
    return data;
  }

  function warning (error) {
    return {
      code: 0,
      data: error,
      message: error.message || 'ADVERTENCIA'
    };
  }

  return {
    success,
    error,
    warning
  };
};
