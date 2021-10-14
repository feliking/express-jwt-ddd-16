var transform = require('../parsers/transform');
const errors = require('../../errors');

module.exports = init;

function init (model) {
  return [
    transform,
    create
  ];

  function create (req, res, next) {
    var body = req.body;

    model
      .create(body)
      .then(respond)
      .catch(error => {
        if (error.statusCode) {
          res.status(error.statusCode).send(error);
        } else {
          let err = new errors.InternalServerError(error.message);
          res.status(err.statusCode).send(err);
        }
      });

    function respond (row) {
      res
        .status(201)
        .send(res.transform(row));
    }
  }
}
