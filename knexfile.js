// Update with your config settings.

module.exports = {
  development: {
    client: 'pg',
    version: '10.3',
    connection: {
      host: '127.0.0.1',
      database: 'knex_stream_repro',
    }
  }
};
