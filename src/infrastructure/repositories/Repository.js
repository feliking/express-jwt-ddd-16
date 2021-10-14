'use strict';

const { errorHandler } = require('../lib/util');

async function createOrUpdate (object, model, t) {
  const cond = {
    where: {
      id: object.id || null
    }
  };

  const item = await model.findOne(cond);

  if (item) {
    let updated;
    try {
      if (t) {
        cond.transaction = t;
      }
      updated = await model.update(object, cond);
    } catch (e) {
      if (t) {
        await t.rollback();
      }
      errorHandler(e);
    }

    const result = updated ? await model.findOne(cond) : item;

    if (result) {
      return result.toJSON();
    }
    return null;
  }

  let result;
  try {
    result = await model.create(object, t ? { transaction: t } : {});
  } catch (e) {
    if (t) {
      await t.rollback();
    }
    errorHandler(e);
  }

  return result.toJSON();
}

async function findById (id, model) {
  const result = await model.findOne({
    where: {
      id
    }
  });
  if (result) {
    return result.toJSON();
  }
  return null;
}

async function deleteItem (id, model, t) {
  const cond = {
    where: {
      id
    }
  };

  try {
    const item = await model.findOne(cond);

    if (item) {
      const deleted = await model.destroy(cond);
      return +!!deleted; //  Devuelve 1 si se eliminó correctamente y 0 si no se pudo eliminar
    }
  } catch (e) {
    if (t) {
      await t.rollback();
    }
    throw new Error(e);
  }

  return -1; // Devuelve -1 si no se encontró el registro
}

async function findOne (params, model) {
  const result = await model.findOne({
    where: params
  });

  if (result) {
    return result.toJSON();
  }

  return null;
}

module.exports = {
  findOne,
  deleteItem,
  createOrUpdate,
  findById
};
