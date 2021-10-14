'use strict';

function diff (hourIni, horaEnd) {
  let h1 = hourIni.split(':');
  let h2 = horaEnd.split(':');

  h1 = parseInt(h1[0]) * 60 + parseInt(h1[1]);

  if (h2[1].split('+').length > 1) {
    let add = h2[1].split('+');
    h2 = (parseInt(h2[0]) * 60 + parseInt(add[0])) + 60 * 24 * parseInt(add[1]);
  } else {
    h2 = parseInt(h2[0]) * 60 + parseInt(h2[1]);
  }

  return h2 - h1;
}

function transform (time) {
  let t = time.split(':');

  if (t[1].split('+').length > 1) {
    let add = t[1].split('+');
    t = (parseInt(t[0]) * 60 + parseInt(add[0])) + 60 * 24 * parseInt(add[1]);
  } else {
    t = parseInt(t[0]) * 60 + parseInt(t[1]);
  }

  return t;
}

function transformDate (date) {
  if (typeof date === 'string') {
    let fecha = date.split('/');
    if (fecha.length === 3) {
      if (fecha[2].length === 4) {
        return new Date(fecha[2], parseInt(fecha[1]) - 1, fecha[0]);
      }
    }
  }
  return date;
}

function addDays (date, days) {
  if (typeof date === 'number') {
    return date + (days || 0) * 24 * 60 * 60 * 1000;
  } else {
    return date.getTime() + (days || 0) * 24 * 60 * 60 * 1000;
  }
}

function formatDate (date) {
  return [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-');
}

module.exports = {
  diff,
  transformDate,
  transform,
  addDays,
  formatDate
};
