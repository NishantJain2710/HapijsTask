/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable('store', (table) => {
        table.increments();
        table.string('name').notNullable();
        table.string('address').nullable();
        table.string('city').nullable();
        table.string('pincode').nullable();
        table.string('state').nullable();
        table.string('countary').nullable();
        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.timestamp('updatedAt').defaultTo(knex.fn.now());
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('store');
};
