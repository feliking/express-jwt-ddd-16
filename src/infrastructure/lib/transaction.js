'use strict';

module.exports = function setupTransaction (sequelize) {
  function create () {
    return new Promise((resolve, reject) => {
      return sequelize.transaction()
        .then(t => (resolve(t)));
    });
  }

  function commit (t) {
    t.commit();
  }

  function rollback (t) {
    t.rollback();
  }

  return {
    create,
    commit,
    rollback
  };
};
