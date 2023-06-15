// Can use this structure
const config = {
  development: {
    dialectOptions: {},
  },
  production: {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};

module.exports = {
  [process.env.NODE_ENV]: {
    ...config[process.env.NODE_ENV],
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    define: {
      charset: 'utf8',
      collate: 'utf8_general_ci',
    },
    dialectOptions: {
      useUTC: true,
      timezone: 'Etc/GMT0',
      ...config[process.env.NODE_ENV].dialectOptions,
    },
    // Use a different table name. Default: SequelizeMeta
    migrationStorageTableName: 'sequelizeMeta',
    // Use a different storage. Default: none
    seederStorage: 'sequelize',
    // Use a different table name. Default: SequelizeData
    seederStorageTableName: 'sequelizeData',
    logging: process.env.DATABASE_LOGGING === 'true' ? console.log : false,
  },
};
