import _ from 'lodash';
import {Op} from 'sequelize';
import BaseRepository from 'db/repositories/BaseRepository';
import models from 'db/models';

class UserRepository extends BaseRepository {
  constructor() {
    super(models && models.user);

    this.attributes = ['id', 'email', 'firstName', 'lastName', 'userRoleId'];
  }

  getBaseIncludes(attributes) {
    return [
      {
        model: models.userRole,
        attributes: _.uniq(['id', 'name', ...(attributes?.userRole || [])]),
      },
    ];
  }

  async getItemById(userId, options = {}) {
    const user = await this.source.findOne({
      where: {
        id: userId,
      },
      include: this.getBaseIncludes(options.includeAttributes),
      ...options,
      attributes: options.attributes || this.attributes,
    });

    return user;
  }

  async findUsersByEmail(email = null) {
    const users = await this.source.findAll({
      include: this.getBaseIncludes(),
      where: {
        email: email.toLowerCase(),
      },
    });

    return users;
  }

  async getDeletedUsers() {
    return this.source.findAll({
      where: {
        deletedAt: {
          [Op.not]: null,
        },
      },
      paranoid: false,
    });
  }
}

export default new UserRepository();
