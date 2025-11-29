const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect: 'mysql',
  timezone: '+03:00', // São Paulo (UTC-3)
  dialectOptions: {
    timezone: '+03:00',
    dateStrings: true,
    typeCast: true,
  },
  seederStorage: 'sequelize',
  seederStoragePath: 'sequelize-data.json',
  seederStorageTableName: 'sequelize_data',
  charset: 'utf8mb4',
  collate: 'utf8mb4_general_ci',
};
