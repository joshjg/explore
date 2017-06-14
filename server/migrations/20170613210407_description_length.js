
exports.up = function(knex, Promise) {
  return knex.schema
    .alterTable('Location', function (table) {
      table.string('description', 1024).alter();
    });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .alterTable('Location', function (table) {
      table.string('description').alter();
    });
};
