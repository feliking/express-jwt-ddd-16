'use strict';

const debug = require('debug')('app:graphql');
const { ApolloServer } = require('apollo-server-express');
const auth = require('express-jwt');
const { config } = require('../../common');
const { verify } = require('../lib/auth');

module.exports = async function setupGraphql (app, services, graphql) {
  debug('Iniciando servidor GraphQL de desarrollo');

  const rootQuery = `
    # Consultas Base
    type Query {
      ${graphql.queries.Query}
    }

    # Mutaciones Base
    type Mutation {
      ${graphql.queries.Mutation}
    }
  `;

  const server = new ApolloServer({
    typeDefs: [rootQuery].concat(graphql.schemes).join(''),
    resolvers: graphql.resolvers,
    formatError: (error) => {
      return {
        code: -1,
        data: error.name,
        message: error.message
      };
    },
    playground: {
      endpoint: `http://localhost:3000/graphql`,
      settings: {
        'editor.theme': 'dark'
      }
    }
  });

  await server.start();

  server.applyMiddleware({ app, path: '/graphql' });

  return app;
};
