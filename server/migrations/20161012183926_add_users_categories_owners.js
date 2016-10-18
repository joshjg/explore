exports.up = function (knex, Promise) {
  return knex.schema
    .createTable('User', function (table) {
      table.increments('id').primary();
      table.string('email');
      table.string('password');
      table.boolean('admin');
      table.boolean('canCreate');
    })
    .table('Location', function (table) {
      table.dropColumn('category');
      table.json('categories');
      table.json('owners');
    });
};

exports.down = function (knex, Promise) {
  return knex.schema
    .dropTableIfExists('User')
    .table('Location', function (table) {
      table.string('category');
      table.dropColumns('categories', 'owners');
    });
};
