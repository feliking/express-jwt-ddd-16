'use strict';

const { config } = require('../../common');

let configSeeder = {
  'development': {
    'username': config.db.username,
    'password': config.db.password,
    'database': config.db.database,
    'host': config.db.host,
    'seederStorage': 'sequelize',
    'seederStorageTableName': 'sequelize_seeders',
    'dialect': config.db.dialect,
    'pool': config.db.pool,
    'dialectOptions': config.db.dialectOptions
  },
  'production': {
    'username': config.db.username,
    'password': config.db.password,
    'database': config.db.database,
    'host': config.db.host,
    'seederStorage': 'sequelize',
    'seederStorageTableName': 'sequelize_seeders',
    'dialect': config.db.dialect,
    'pool': config.db.pool,
    'dialectOptions': config.db.dialectOptions
  }
};

module.exports = configSeeder;
