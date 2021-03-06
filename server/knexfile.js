/* eslint-disable strict */

'use strict';

require('dotenv').config();

const path = require('path');

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: path.join(__dirname, 'db.sqlite'),
    },
    useNullAsDefault: true,
  },

  production: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      port: '5432',
      database: 'exploremoco',
      user: 'exploremoco',
      password: process.env.DB_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
    useNullAsDefault: true,
  },

};
