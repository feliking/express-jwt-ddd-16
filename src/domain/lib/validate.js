'use strict';

function empty (value) {
  return value === undefined || value === null || value.length === 0 || /^\s+$/.test(value);
}

function required (data, errors, index, field) {
  if (empty(data[field])) {
    createError(errors, index, field, `El campo ${field} es obligatorio`);
    return false;
  }
  return true;
}

function validarFecha (data, errors, index, field) {
  if (!/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/gi.test(data[field])) { // eslint-disable-line
    createError(errors, index, field, `La fecha <strong><em>${data[field]}</em></strong> no tiene un formato válido, debe tener el formato: 'DD/MM/YYYY'.`);
    return false;
  }
  return true;
}

function validarEmail (data, errors, index, field) {
  if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(data[field])) { // eslint-disable-line
    createError(errors, index, field, `El correo electrónico <strong><em>${data[field]}</em></strong> no tiene un formato válido, debe ingresar un correo electrónico válido.`);
    return false;
  } else {
    if (data[field] && data[field].length > 100) {
      createError(errors, index, field, `El correo electrónico <strong><em>${data[field]}</em></strong> solo debe tener más de 100 carácteres como máximo.`);
      return false;
    }
  }
  return true;
}

function createError (errors, index, field, value) {
  let err = parseInt(index) + 1;
  if (errors[err] === undefined) {
    errors[err] = {};
  }
  errors[err][field] = value;
}

function requiredFields (data, fields) {
  for (let i in fields) {
    if (empty(data[fields[i]])) {
      return `El campo "${fields[i]}" es obligatorio.`;
    }
  }
  return true;
}

function validarHora (item, index, field, errors, plus = false) {
  if (item[field] && item[field].length) {
    if (item[field].length > 7) {
      createError(errors, index, field, `Solo puede ingresar un máximo de 7 carácteres`);
    } else {
      if (plus) {
        if (!/^([0-1]?[0-9]|2[0-3])(:[0-5][0-9])(\+[1-3])?$/g.test(item[field])) {
          createError(errors, index, field, `Hora incorrecta <strong><em>${item[field]}</em></strong> el formato de hora es hh:mm o hh:mm+1 (hora más un día)`);
        }
      } else {
        if (!/^([0-1]?[0-9]|2[0-3])(:[0-5][0-9])$/g.test(item[field])) {
          createError(errors, index, field, `Hora incorrecta <strong><em>${item[field]}</em></strong> el formato de hora es hh:mm`);
        }
      }
    }
  } else {
    createError(errors, index, field, `Dato obligatorio`);
  }
}

module.exports = {
  empty,
  required,
  validarFecha,
  validarEmail,
  createError,
  validarHora,
  requiredFields
};
