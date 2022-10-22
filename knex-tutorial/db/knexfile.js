// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

const path = require('path');
// Update with your config settings.

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      user: 'postgres',
      host: 'localhost',
      database: 'userKnex',
      password: 'root',
      port: 5432,
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    useNullAsDefault: true
  }
};
