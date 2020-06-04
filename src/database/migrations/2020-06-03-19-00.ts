import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('points', (table) => {
    table.increments('id').primary();
    table.string('image', 255).notNullable();
    table.string('name', 100).notNullable();
    table.string('email', 50).notNullable();
    table.string('whatsapp', 15).notNullable();
    table.decimal('lat').notNullable();
    table.decimal('lon').notNullable();
    table.string('city', 50).notNullable();
    table.string('uf', 2).notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('points');
}
