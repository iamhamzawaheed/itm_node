const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');
const config = require('../config/config.json'); 
const env = process.env.NODE_ENV || 'development'; 

const dbConfig = config[env] ;



const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: 'mysql'
});

const db = {};

// Dynamically load models
fs.readdirSync(__dirname)
  .filter(file => file !== 'index.js') // Exclude the index.js file itself
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;  // Assign model to the db object
  });

// Optional: Setup associations if needed
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
