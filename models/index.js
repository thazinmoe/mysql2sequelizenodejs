const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = new Sequelize('reactnodemysqltutorial', 'root', 'mysql123', {
    host: 'localhost',
    logging: false,
    dialect: 'mysql'/* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
  });

  try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  const db = {};
  db.Sequelize=Sequelize;
  db.sequelize=sequelize;

  db.contact = require('./contact')(sequelize,DataTypes)
  db.user = require('./user')(sequelize,DataTypes,Model)
  db.sequelize.sync({ force: true });

  module.exports = db;