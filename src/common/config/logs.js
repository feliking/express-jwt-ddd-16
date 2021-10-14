'use strict';
require('dotenv').config();
const logsConfig = {
  // Donde guardar los logs?
  // - 'database': Guardar en la base de datos (se usa db.js para acceder)
  // - 'filesystem': Guardar en sistema de archivos
  storage: process.env.LOG_STORAGE,

  // Las siguientes opciones solo se toman en cuenta si storage = 'filesystem'
  // para mostrar los logs tambien en la consola
  console: process.env.NODE_ENV !== 'production',
  // directorio con los logs
  outputDirectory: process.env.LOG_OUTPUT_DIRECTORY,
  // nombre de archivo de logs
  outputFilename: process.env.LOG_OUTPUT_FILENAME,
  // formato de logs
  format: process.env.LOG_FORMAT,
  // nivel de verbosidad, posibles: error, info, warning, debug
  level: process.env.LOG_LEVEL
};

module.exports = logsConfig;
