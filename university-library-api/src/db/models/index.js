import {Sequelize, DataTypes} from 'sequelize';
import CONFIG from 'constants/config';
import DB_CONFIG from 'db/config/config';

import UserModelFactory from 'db/models/user';
import UserRoleModelFactory from 'db/models/userRole';
import PostModelFactory from 'db/models/post';

const sequelize = new Sequelize(CONFIG.databaseUrl, DB_CONFIG[CONFIG.env]);

// Create models
const db = {
  user: UserModelFactory(sequelize, DataTypes),
  userRole: UserRoleModelFactory(sequelize, DataTypes),
  post: PostModelFactory(sequelize, DataTypes),
};

// Associate Models
for (const modelName in db) {
  db[modelName].associate && db[modelName].associate(db);
}

db.sequelize = sequelize;

export default db;
