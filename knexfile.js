// Update with your config settings.

module.exports = {
  development: {
    client: 'pg',
    version: '9.6',
    connection: {
      host: '127.0.0.1',
      database: 'knex_pg_stream_repro',
    }
  }
};
