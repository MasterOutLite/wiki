import {Model} from 'sequelize';

export default (sequelize, DataTypes) => {
  const options = {
    sequelize,
    modelName: 'post',
    paranoid: true,
  };

  class Post extends Model {
    updateModel(item) {
      this.name = item.hasOwnProperty('email') ? item.email : this.email;
      this.description = item.hasOwnProperty('password') ? item.password : this.password;
    }
  }

  Post.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.TEXT,
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

  Post.associate = models => {
    Post.belongsTo(models.user);
  };

  return Post;
};
