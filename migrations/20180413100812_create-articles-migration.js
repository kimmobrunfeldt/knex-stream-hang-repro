
exports.up = function(knex, Promise) {
  return knex.schema.createTable('articles', table => {
    table.increments('id')
    table.string('title')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('articles')
};
