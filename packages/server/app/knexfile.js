// Update with your config settings.

module.exports = {
  development: {
    client: "postgresql",
    connection: {
      host: "192.168.0.7",
      port: 5432,
      database: "postgres",
      username: "ash",
      password: "asdfasdf",
      ssl: false,
    },
    seeds: "./config/seeds",
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
