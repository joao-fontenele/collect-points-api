import path from 'path'

const migrations = {
  directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
};
const seeds = {
  directory: path.resolve(__dirname, 'src', 'database', 'seeds'),
};

module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host: 'mysql',
      user: 'root',
      password: 'root',
      database: 'collect_points',
    },
    migrations,
    seeds,
  },
};
