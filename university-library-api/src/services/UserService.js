import {UserRepository} from 'db/repositories';
import helpers from 'helpers';
import {saltHashPassword} from 'helpers/crypto';
import USER from 'constants/user';

class UserService {
  async getAll() {
    const data = await UserRepository.getAll({
      paranoid: true,
    });

    return data;
  }

  async getItem(id) {
    const user = await UserRepository.getItemById(id, {
      attributes: UserRepository.attributes.filter(item => item !== 'deletedAt'),
    });

    if (!user) {
      throw new helpers.errors.NotFound('errors.notFound.user');
    }

    return user;
  }

  async create(data = {}) {
    const {emails, phones, userName, userRoleId} = data;

    // todo check email

    const {salt, passwordHash} = await saltHashPassword(data?.password);
    const item = await UserRepository.createItem({
      userRoleId: userRoleId || USER.roles.member.id,
      ...data,
      password: passwordHash,
      salt,
    });

    return UserRepository.getItemById(item.id);
  }

  async update(userId, data = {}) {
    const item = await UserRepository.getItemById(userId);
    if (!item) {
      throw new helpers.errors.NotFound();
    }

    const {password, oldPassword, ...updateData} = data;

    // check password
    const passwordUpdateData = {};
    if (password && !oldPassword) {
      throw new helpers.errors.InvalidData('errors.invalidData.oldPasswordNotProvided');
    }
    if (password && oldPassword && password === oldPassword) {
      throw new helpers.errors.InvalidData('errors.invalidData.passwordsSameValues');
    }
    if (password && oldPassword && password !== oldPassword) {
      const {passwordHash: passwordHashCheck} = await helpers.sha512(oldPassword, item.salt);
      if (item.password !== passwordHashCheck) {
        throw new helpers.errors.InvalidData('errors.invalidData.wrongOldPassword');
      }

      const {salt, passwordHash} = await saltHashPassword(password);
      passwordUpdateData.password = passwordHash;
      passwordUpdateData.salt = salt;
    }
    delete data.password;

    // needs for manual updating updatedAt field
    item.changed('updatedAt', true);
    // update user
    item.updateModel({
      ...passwordUpdateData,
      ...updateData,
      updatedAt: new Date(),
    });
    await UserRepository.updateEntity(item);

    return UserRepository.getItemById(item.id);
  }

  async updateRole(userId, data = {}, currentUser = {}) {
    const item = await UserRepository.getItemById(userId);
    if (!item) {
      throw new helpers.errors.NotFound();
    }

    // Only owner of the account can change the role
    console.log(currentUser.id, item.id);
    if (currentUser.id !== item.id) {
      throw new helpers.errors.NotFound();
    }

    if (item.userRoleId && item.userRoleId !== USER.roles.member.id) {
      throw new helpers.errors.InvalidData('User role already set');
    }

    const {userRoleId} = data;

    // needs for manual updating updatedAt field
    item.changed('updatedAt', true);
    // update user
    item.updateModel({
      userRoleId,
      updatedAt: new Date(),
    });
    await UserRepository.updateEntity(item);

    return UserRepository.getItemById(item.id);
  }

  async delete(userId = {}) {
    const item = await UserRepository.getItemById(userId);
    await UserRepository.deleteItem(userId);

    return item;
  }
}

export default new UserService();
