'use strict';

// Llamando a la librería i18n de la capa Transversal(common)
const { i18n } = require('../../common');

// Iniciando la ruta donde se encuentra los archivos de traducción
i18n.init(__dirname);

module.exports = i18n;
