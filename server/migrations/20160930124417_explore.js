exports.up = function (knex) {
  return knex.schema
    .createTable('Location', function (table) {
      table.increments('id').primary();
      table.string('name');
      table.string('description');
      table.string('category');
      table.string('logo');
      table.float('lat');
      table.float('lng');
      table.json('address');
      table.string('email');
      table.string('website');
      table.string('contactName');
      table.string('phone');
    })
    .createTable('Photo', function (table) {
      table.increments('id').primary();
      table.string('caption');
      table.integer('locationId').unsigned().references('id').inTable('Location');
    })
    .createTable('Event', function (table) {
      table.increments('id').primary();
      table.string('name');
      table.string('description');
      table.date('date');
      table.time('timeStart');
      table.time('timeEnd');
      table.integer('locationId').unsigned().references('id').inTable('Location');
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('Location')
    .dropTableIfExists('Photo')
    .dropTableIfExists('Event');
};
