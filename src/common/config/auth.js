'use strict';

const auth = {
  secret: process.env.SECRET || 'BASE',
  algorithms: ['RS256']
};

module.exports = auth;
