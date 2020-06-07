import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.alterTable('points', (table) => {
    table.decimal('lat', 10, 8).notNullable().alter();
    table.decimal('lon', 11, 8).notNullable().alter();
  });
}

export async function down(knex: Knex) {
  return knex.schema.alterTable('points', (table) => {
    table.decimal('lat').notNullable().alter();
    table.decimal('lon').notNullable().alter();
  });
}
