import {Model} from 'sequelize';

export default (sequelize, DataTypes) => {
  const options = {
    sequelize,
    modelName: 'user',
    paranoid: true,
  };

  class User extends Model {
    updateModel(item) {
      this.email = item.hasOwnProperty('email') ? item.email : this.email;
      this.password = item.hasOwnProperty('password') ? item.password : this.password;
      this.salt = item.hasOwnProperty('salt') ? item.salt : this.salt;
      this.firstName = item.hasOwnProperty('firstName') ? item.firstName : this.firstName;
      this.lastName = item.hasOwnProperty('lastName') ? item.lastName : this.lastName;
      this.userRoleId = item.hasOwnProperty('userRoleId') ? item.userRoleId : this.userRoleId;
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
        set(value) {
          value && this.setDataValue('email', value.toLowerCase());
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      salt: {
        type: DataTypes.STRING,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
    },
    options
  );

  User.associate = models => {
    User.belongsTo(models.userRole);
  };

  return User;
};
