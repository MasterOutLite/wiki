import {Model} from 'sequelize';

export default (sequelize, DataTypes) => {
  const options = {
    sequelize,
    modelName: 'userRole',
    timestamps: false,
  };

  class UserRole extends Model {}

  UserRole.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      permissions: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        allowNull: true,
        defaultValue: null,
      },
    },
    options
  );

  UserRole.associate = models => {
    UserRole.hasMany(models.user);
  };

  return UserRole;
};
