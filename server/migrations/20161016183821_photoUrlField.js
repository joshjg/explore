exports.up = function (knex, Promise) {
  return knex.schema
    .table('Photo', function (table) {
      table.string('url');
    });
};

exports.down = function (knex, Promise) {
  return knex.schema
    .table('Photo', function (table) {
      table.dropColumn('url');
    });
};
