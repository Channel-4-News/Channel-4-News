const { Sequelize } = require('sequelize');
const db = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost/channel_4_news_db',
  { logging: false }
);

module.exports = db;
