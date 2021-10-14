'use strict';

const ValueObject = require('../ValueObject');

class Decimal extends ValueObject {
  constructor (name, value, { required = false, maxlength = 11, minStrict, min, equal, maxStrict, max }, errors, integer = false) {
    super(name, value, { required }, errors);

    this.type = Number;
    this.rules = {
      numericality: {
        strict: true,
        notValid: 'no es un número válido'
      }
    };
    if (integer) {
      this.rules.numericality.onlyInteger = true;
      this.rules.numericality.notInteger = 'no es un número entero';
    }
    if (minStrict) { // >
      this.rules.numericality.greaterThan = minStrict;
      this.rules.numericality.notGreaterThan = 'debe ser mayor a %{count}';
    }
    if (min) { // >=
      this.rules.numericality.greaterThanOrEqualTo = min;
      this.rules.numericality.notGreaterThanOrEqualTo = 'debe ser mayor o igual a %{count}';
    }
    if (equal) { // =
      this.rules.numericality.equalTo = equal;
      this.rules.numericality.notEqualTo = 'debe ser igual a %{count}';
    }
    if (maxStrict) { // <
      this.rules.numericality.lessThan = maxStrict;
      this.rules.numericality.notLessThan = 'debe ser menor a %{count}';
    }
    this.rules.numericality.lessThanOrEqualTo = max || (Math.pow(10, maxlength || 11) - 1);
    this.rules.numericality.notLessThanOrEqualTo = 'debe ser menor o igual a %{count}';

    super.validate();
  }
}

module.exports = Decimal;
