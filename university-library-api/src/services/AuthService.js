import helpers from 'helpers';
import {UserRepository} from 'db/repositories';

class AuthService {
  async login({email, password}, adminLogin = false) {
    const users = await UserRepository.findUsersByEmail(email);

    let user = {};
    if (helpers.isEmpty(users)) {
      throw new helpers.errors.NotFound('errors.notFound.userByEmail', email);
    } else {
      await helpers.asyncForEach(users, async item => {
        const {passwordHash} = await helpers.sha512(password, item.salt);
        if (item.password === passwordHash) {
          user = item;
        }
      });

      if (helpers.isEmpty(user)) {
        throw new helpers.errors.InvalidPassword();
      }
    }

    // generate token
    const token = helpers.createAccessToken({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      userRoleId: user.userRoleId,
      permissions: user.userRole.permissions,
    });

    return {
      token,
    };
  }

  async logout({token = null}) {
    if (!token) {
      throw new helpers.errors.BadRequest();
    }

    // todo
    return true;
  }
}

export default new AuthService();
