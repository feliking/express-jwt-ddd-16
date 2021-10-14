'use strict';

const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const moment = require('moment');

const scalars = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue (value) { // set
      // return new Date(value); // value from the client
      // return moment(value).format('YYYY-MM-DD');
      return moment(value, 'YYYY-MM-DD').format('YYYY-MM-DD');
    },
    serialize (value) { // get
      // return moment(value).format('DD/MM/YYYY, h:mm a'); // value sent to the client
      return value;
    },
    parseLiteral (ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10); // ast value is always in string format
      }
      return null;
    }
  }),
  JSON: new GraphQLScalarType({
    name: 'JSON',
    description:
      'The `JSON` scalar type represents JSON values as specified by ' +
      '[ECMA-404](http://www.ecma-international.org/' +
      'publications/files/ECMA-ST/ECMA-404.pdf).',
    serialize: identity,
    parseValue: identity,
    parseLiteral
  })
};

function identity (value) {
  return value;
}

function parseLiteral (ast) {
  switch (ast.kind) {
    case Kind.STRING:
    case Kind.BOOLEAN:
      return ast.value;
    case Kind.INT:
    case Kind.FLOAT:
      return parseFloat(ast.value);
    case Kind.OBJECT: {
      const value = Object.create(null);
      ast.fields.forEach((field) => {
        value[field.name.value] = parseLiteral(field.value);
      });

      return value;
    }
    case Kind.LIST:
      return ast.values.map(parseLiteral);
    default:
      return null;
  }
}

module.exports = scalars;
