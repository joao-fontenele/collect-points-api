import knex from 'knex';

const connection = knex({
  client: 'mysql2',
  connection: {
    host: 'mysql',
    user: 'root',
    password: 'root',
    database: 'collect_points',
  },
});

export default connection;
