/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable('invoice', (table) => {
        table.increments();
        table.string('referenceId').notNullable();
        table.decimal('totalBill').defaultTo(0.0).notNullable();
        table.decimal('amountPaid').defaultTo(0.0).notNullable();
        table.string('mode').notNullable();
        table.timestamp('date').notNullable();
        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.timestamp('updatedAt').defaultTo(knex.fn.now());
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('invoice');
};
