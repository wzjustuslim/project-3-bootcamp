module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: null,
    database: 'project3_development',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
};