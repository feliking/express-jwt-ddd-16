async function findAll (params = {}, repository, res, name = '') {
  let lista;

  try {
    lista = await repository.findAll(params);
  } catch (e) {
    return res.error(e);
  }

  if (!lista) {
    return res.warning(new Error(`Error al obtener la lista de ${name}`));
  }

  return res.success(lista);
}

async function findById (id, repository, res, name = '') {
  let item;
  try {
    item = await repository.findById(id);
  } catch (e) {
    return res.error(e);
  }

  if (!item) {
    return res.warning(new Error(`${name} ${id} not found`));
  }

  return res.success(item);
}

async function createOrUpdate (data, repository, res, name = '') {
  let item;
  try {
    item = await repository.createOrUpdate(data);
  } catch (e) {
    return res.error(e);
  }

  if (!item) {
    return res.warning(new Error(`El ${name} no pudo ser creado`));
  }

  return res.success(item);
}

async function deleteItem (id, repository, res, name = '') {
  let deleted;
  try {
    deleted = await repository.deleteItem(id);
  } catch (e) {
    return res.error(e);
  }

  if (deleted === -1) {
    return res.warning(new Error(`No existe el ${name}`));
  }

  if (deleted === 0) {
    return res.warning(new Error(`El ${name} ya fue eliminado`));
  }

  return res.success(deleted > 0);
}

function validate (data, valueObjects = {}) {
  if (data.id) {
    for (let key in valueObjects) {
      if (data[key] !== undefined) {
        data[key] = new valueObjects[key](data[key]).value;
      }
    }
  } else {
    for (let key in valueObjects) {
      data[key] = new valueObjects[key](data[key]).value;
    }
  }
}

module.exports = {
  findAll,
  deleteItem,
  findById,
  createOrUpdate,
  validate
};
