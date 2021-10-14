var errors = require('../../errors');
var transform = require('../parsers/transform');
var i18n = require('../../i18n');

module.exports = init;

function init (model) {
  return [
    transform,
    get
  ];

  function get (req, res, next) {
    var options = req.options || {};

    options.where = options.where || {};
    options.where[model.primaryKeyAttribute] = req.params.id;

    model
      .findOne(options)
      .then(respond)
      .catch(next);

    function respond (row) {
      if (row) {
        res.status(200).send(res.transform(row));
      } else {
        let err = new errors.NotFoundError(i18n.t('errors.crud.rowNotFound'));
        res.status(err.statusCode).send(err);
      }
    }
  }
}
