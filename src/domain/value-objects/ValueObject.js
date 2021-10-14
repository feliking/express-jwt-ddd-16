'use strict';

// Para conocer las reglas de validación puede ver la documentación de validate.js en https://validatejs.org/

const validatejs = require('validate.js');
const moment = require('moment');
const types = ['String', 'Number', 'Array', 'Boolean', 'Object', 'Date'];

class ValueObject {
  constructor (name, value, { required = false }, errors) {
    this.name = name;
    this.value = value;
    this.required = required;
    this.errors = errors;

    // Before using it we must add the parse and format functions
    // Here is a sample implementation using moment.js
    validatejs.extend(validatejs.validators.datetime, {
      // The value is guaranteed not to be null or undefined but otherwise it
      // could be anything.
      parse: function (value, options) {
        return +moment.utc(value);
      },
      // Input is a unix timestamp
      format: function (value, options) {
        var format = options.dateOnly ? 'YYYY-MM-DD' : 'YYYY-MM-DD hh:mm:ss';
        return moment.utc(value).format(format);
      }
    });
  }

  number (value) {
    if (validatejs.isNumber(value)) {
      return true;
    }
    this.setError({ [this.name]: [ `${this.errors ? '' : this.name + ' '}no es un número` ] });
  }

  string (value) {
    if (validatejs.isString(value)) {
      return true;
    }
    this.setError({ [this.name]: [ `${this.errors ? '' : this.name + ' '}no es una cadena` ] });
  }

  boolean (value) {
    if (validatejs.isBoolean(value)) {
      return true;
    }
    this.setError({ [this.name]: [ `${this.errors ? '' : this.name + ' '}no es un booleano` ] });
  }

  object (value) {
    if (validatejs.isObject(value)) {
      return true;
    }
    this.setError({ [this.name]: [ `${this.errors ? '' : this.name + ' '}no es un objeto` ] });
  }

  array (value) {
    if (validatejs.isArray(value)) {
      return true;
    }
    this.setError({ [this.name]: [ `${this.errors ? '' : this.name + ' '}no es una cadena` ] });
  }

  date (value) {
    if (validatejs.isDate(value)) {
      return true;
    }
    this.setError({ [this.name]: [ `${this.errors ? '' : this.name + ' '}no es una fecha válida` ] });
  }

  setError (error) {
    if (error) {
      if (this.errors) {
        if (validatejs.isArray(this.errors)) {
          this.errors.push(error);
        } else {
          throw new Error('El parámetro errors tiene que ser un Array');
        }
      } else {
        let message = [];
        for (let key in error) {
          message.push(`${error[key].join(' - ')}`);
        }
        throw new Error(message.join('\n'));
      }
    }
  }

  validate () {
    if (typeof this.name === 'undefined') {
      throw new Error('Debe definir el name');
    }
    if (typeof this.rules === 'undefined') {
      throw new Error('Debe definir las reglas de validación en rules');
    }
    if (!validatejs.isString(this.name)) {
      throw new Error('La propiedad name debe ser un String');
    }
    if (typeof this.type === 'undefined') {
      throw new Error('Debe definir el type');
    }
    if (typeof this.rules === 'undefined') {
      throw new Error('Debe definir los rules');
    }
    if (typeof this.type === 'function' && types.indexOf(this.type.name) !== -1) {
      let type = this.type.name.toLowerCase();
      if (this.required) {
        this.rules.presence = {
          message: 'es obligatorio'
        };
        if (type !== 'number') {
          this[type](this.value);
        }
        let errors = validatejs({ [this.name]: this.value }, { [this.name]: this.rules });
        this.setError(errors);
      } else {
        if (!this.empty(this.value)) {
          if (type !== 'number') {
            this[type](this.value);
          }
          let errors = validatejs({ [this.name]: this.value }, { [this.name]: this.rules });
          this.setError(errors);
        }
      }
    } else {
      throw new Error('No existe ese tipo de dato, valores válidos: Number, String, Boolean, Array, Object o Date.');
    }
  }

  empty (value) {
    return value === undefined || value === null || value.length === 0 || /^\s+$/.test(value);
  }
}

module.exports = ValueObject;
