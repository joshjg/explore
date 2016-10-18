exports.up = function (knex, Promise) {
  return knex.schema
    .table('Event', function (table) {
      table.dropColumn('date');
      table.dropColumn('timeStart');
      table.dropColumn('timeEnd');
    })
    .table('Event', function (table) {
      table.integer('date');
      table.integer('timeStart');
      table.integer('timeEnd');
    });
};

exports.down = function (knex, Promise) {
  return knex.schema
    .table('Event', function (table) {
      table.dropColumn('date');
      table.dropColumn('timeStart');
      table.dropColumn('timeEnd');
    })
    .table('Event', function (table) {
      table.date('date');
      table.time('timeStart');
      table.time('timeEnd');
    });
};
