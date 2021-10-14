var errors = require('../../errors');
var i18n = require('../../i18n');

module.exports = init;

function init (model) {
  return [
    remove
  ];

  function remove (req, res, next) {
    var options = req.options || {};

    options.where = options.where || {};
    options.where[model.primaryKeyAttribute] = req.params.id;

    removeRow(model, options)
      .then(() => {
        res.status(204).send({message: 'deleted'});
      }).catch(() => {
        let err = new errors.NotFoundError(i18n.t('errors.crud.rowNotFound'));
        res.status(err.statusCode).send(err);
      });

    function removeRow (model, options) {
      return new Promise((resolve, reject) => {
        model.findOne(options)
          .then(row => {
            if (!row) {
              reject(new Error('No existe el registro'));
            } else {
              return row.destroy();
            }
          })
          .then(() => {
            resolve(true);
          })
          .catch(error => {
            reject(new Error(`Ocurrió un error al eliminar: ${error}`));
          });
      });
    }
  }
}
