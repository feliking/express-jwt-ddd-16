var errors = require('../../errors');
var transform = require('../parsers/transform');
var i18n = require('../../i18n');

module.exports = init;

function init (model) {
  return [
    transform,
    update
  ];

  function update (req, res, next) {
    var body = req.body;
    var options = req.options || {};

    options.where = options.where || {};
    options.where[model.primaryKeyAttribute] = req.params.id;

    model
      .findOne(options)
      .then(updateAttributes)
      .then(respond)
      .catch(error => {
        res.status(error.statusCode).send(error);
      });

    function updateAttributes (row) {
      if (!row) {
        throw new errors.NotFoundError(i18n.t('errors.crud.rowNotFound'));
      } else {
        return row.updateAttributes(body);
      }
    }

    function respond (row) {
      res
        .status(200)
        .send(res.transform(row));
    }
  }
}
