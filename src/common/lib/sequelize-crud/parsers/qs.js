var _ = require('lodash');

module.exports = {
  fields: fields,
  filters: filters,
  limit: limit,
  offset: offset,
  sort: sort,
  procesarFecha: procesarFecha
};

function fields (options) {
  var fields = null;

  if (options) {
    fields = options.split(',');
  }

  return fields;
}

function filters (options) {
  var filters = null;

  if (!_.isEmpty(options)) {
    filters = {};
    _.forOwn(options, function (value, key) {
      try {
        filters[key] = JSON.parse(value);
      } catch (err) {
        filters[key] = value.split(',');
      }
    });
  }

  return filters;
}

function limit (value) {
  value = parseInt(value);

  if (!value || value < 0) {
    value = 0;
  }
  return value;
}

function offset (value) {
  value = parseInt(value);

  if (!value || value < 0) {
    value = 0;
  }
  return value;
}

function sort (options) {
  var properties;
  var sort = null;

  if (options) {
    properties = options.split(',');

    sort = _.map(properties, function (x) {
      if (x.indexOf('-') === 0) {
        return [x.substr(1), 'DESC'];
      } else {
        return [x, 'ASC'];
      }
    });
  }

  return sort;
}

/**
  Funcion que procesa una cadena, verifica si tiene el formato de una fecha.
  @param {pCadena} Cadena de texto con formato de fecha.
  @return Retorna:
  EXITO -> un objeto de consulta con formato sequelize.
  FALLO -> false.
*/
function procesarFecha (data) {
  var fecha = new Date(data);
  var year, inicio, fin;

  /* Identifica el operador usando en la cadena para separar los datos. */
  var operador = data.indexOf('-') !== -1 ? '-' : data.indexOf('/') !== -1 ? '/' : null;

  /* Si existe un operador valido en la cadena. */
  if (operador) {
    /* Si la cadena no es valida como fecha, se la invierte. */
    if (fecha === 'Invalid Date') {
      fecha = new Date(((data.split(operador)).reverse()).join('-'));
    }
    /* Obtiene el año. */
    year = fecha.getFullYear();

    /* Si existe el año. */
    if (year) {
      var vector = data.split(operador);

      /* Si la longitud del vector es igual a 3. */
      if (vector.length === 3) {
        var indice = vector.indexOf(year.toString());

        /* Si el año existe dentro del vector de la cadena. */
        if (indice !== -1) {
          /* Armado de la fecha inicio y fecha fin. */
          if (indice === 0) {
            inicio = vector[0] + '-' + vector[1] + '-' + vector[2];
            fin = vector[0] + '-' + vector[1] + '-' + (parseInt(vector[2]) + 1);
          } else if (indice === 2) {
            inicio = vector[2] + '-' + vector[1] + '-' + vector[0];
            fin = vector[2] + '-' + vector[1] + '-' + (parseInt(vector[0]) + 1);
          }

          /* Armado de la respuesta a retornar. */
          return {
            $gte: inicio,
            $lt: fin
          };
        }
      }
    }
  }

  return false;
}
