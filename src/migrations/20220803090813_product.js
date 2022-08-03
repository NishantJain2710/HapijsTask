/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable('products', (table) => {
        table.increments();
        table.string('name').notNullable();
        table.bigInteger('quantity').defaultTo(0).notNullable();
        table.decimal('price').defaultTo(0.0).notNullable();
        table.decimal('discount').defaultTo(0.0).notNullable();
        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.timestamp('updatedAt').defaultTo(knex.fn.now());
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('products');
};
