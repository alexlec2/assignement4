exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('usersKnex').del()
        .then(function () {
            // Inserts seed entries
            return knex('usersKnex').insert([
                {id: 1, name: 'Hettie Marshall', email: 'lantunde@acbo.va'},
                {id: 2, name: 'Hester Owens', email: 'zo@girih.lv'},
                {id: 3, name: 'Henry Jackson', email: 'bekamohi@owo.mt'}
            ]);
        });
};