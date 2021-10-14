'use strict';

const { Date, JSON } = require('./scalars');
const { loadGraphqlFile } = require('../lib/util');

module.exports = (services) => {
  // Load schemes, resolvers, queries and mutations
  const files = loadGraphqlFile(__dirname, { exclude: [ 'index.js', 'scalars.js', 'server.js' ] }, services);

  return {
    schemes: files.schemas,
    queries: {
      Query: files.queries,
      Mutation: files.mutations
    },
    resolvers: {
      Query: files.resolvers.Query,
      Mutation: files.resolvers.Mutation,
      Date,
      JSON
    }
  };
};
