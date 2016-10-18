
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('Location').del()
    .then(function () {
      return Promise.all([
        knex('User').del(),
      ]);
    })
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('Location').insert({id: 1, name: 'FarmA'}),
        knex('Location').insert({id: 2, name: 'FarmB'}),
        knex('Location').insert({id: 3, name: 'FarmC'}),
        knex('User').insert({id: 1, email: 'test@test.com', password: 'hekbuieb'}),
      ]);
    });
};
