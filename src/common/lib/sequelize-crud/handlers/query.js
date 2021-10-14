const _ = require('lodash');
const qs = require('../parsers/qs');
const transform = require('../parsers/transform');
module.exports = init;

function init (model) {
  return [
    transform,
    filter,
    query
  ];

  function filter (req, res, next) {
    var options = {};
    var keys = {};

    model = req.model || model;

    keys.model = _.keys(model.rawAttributes);
    keys.query = _.keys(req.query);
    keys.filters = _.intersection(keys.model, keys.query);

    options.attributes = qs.fields(req.query.fields);
    if (req.query && req.query.limit && req.query.limit !== 'all') {
      options.limit = qs.limit(req.query.limit) || 50;
    }
    options.offset = req.query.offset ? qs.offset(req.query.offset) : (req.query.limit * ((req.query.page || 1) - 1)) || 0;
    options.order = qs.sort(req.query.order);

    if (req.query.filter && req.query.filter.length) { // JHBQP
      model.describe()
        .then(function (fields) {
          var xfilter = [];
          for (var key in fields) {
            var field = fields[key];
            var obj = {};
            var x;

            switch (field.type) {
              case 'INTEGER':
                x = parseInt(req.query.filter);

                if (!isNaN(x) && req.query.filter.indexOf('/') === -1) {
                  obj[key] = x;
                  xfilter.push(obj);
                // obj[key] = `${i}::'varchar' like %${x}%`;

                // obj[key] = {
                //     [`$${i} like`]: '%' + req.query.filter.toUpperCase() + '%'
                // };
                // xfilter.push([Sequelize.cast(Sequelize.col('usuarios.ci'), 'TEXT'), 'ILIKE', `%${req.query.filter.toUpperCase()}%`]);
                }
                break;

              case 'USER-DEFINED':
                x = req.query.filter;
                for (var j in field.special) {
                /* console.log('j',field.special[j]); */
                  if (field.special[j].indexOf(x) === 0) {
                    obj[key] = field.special[j];
                    xfilter.push(obj);
                  }
                }
                break;

              case 'TIMESTAMP WITH TIME ZONE':
              /* Busqueda de fechas del tipo: 2016-10-20, 2016/10/20, 20-10-2016, 20/10/2016. */
              /* TODO: No se puede buscar por el mes. */
                var consulta = qs.procesarFecha(req.query.filter);

                if (consulta) {
                  obj[key] = consulta;
                  xfilter.push(obj);
                }
                break;

              case 'CHARACTER VARYING':
                var minus = {};
                minus[key] = {
                  $like: '%' + req.query.filter.toLowerCase() + '%'
                };
                xfilter.push(minus);
                var mayus = {};
                mayus[key] = {
                  $like: '%' + req.query.filter.toUpperCase() + '%'
                };
                xfilter.push(mayus);
                break;

              default:
                obj[key] = req.query.filter;
                xfilter.push(obj);
            }
          /* console.log(i,' ',fields[key]); */
          }
          for (var k in xfilter[0]) {
            if (k.indexOf('id_') === 0) {
              xfilter.shift(); /* descatamos el id */
            }
          }
          /* console.log('xfilter',xfilter); */

          options.where = { $or: xfilter };
          options = _.omitBy(options, _.isNull);
          req.options = _.merge({}, options, req.options);

          next();
        });
    } else {
      options.where = qs.filters(_.pick(req.query, keys.filters));
      options = _.omitBy(options, _.isNull);
      req.options = _.merge({}, options, req.options);

      next();
    }
  }

  function query (req, res, next) {
    var options = req.options;

    model
      .findAndCountAll(options)
      .then(respond)
      .catch(next);

    function respond (result) {
      var count = result.count;
      var start = options.page;
      var end = options.page + options.limit;

      if (end >= count) {
        end = count;
        res.status(200);
      } else {
        res.status(206);
      }

      res
        .set('Content-Range', start + '-' + end + '/' + count)
        .send(res.transform({
          'count': count,
          'results': result.rows
        }));
    }
  }
}
