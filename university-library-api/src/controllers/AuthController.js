import _ from 'lodash';
import HTTP from 'constants/http';
import AuthService from 'services/AuthService';
import validation, {auth} from 'validation';

class AuthController {
  async login(req, res, next) {
    await validation(req.body, auth.login);

    const data = await AuthService.login(req.body);

    res.status(HTTP.ok).json(data);
  }

  async logout(req, res, next) {
    await AuthService.logout(req.currentUser);

    res.status(HTTP.ok).end();
  }

  async getInfo(req, res, next) {
    const currentUser = _.pick(req?.currentUser, ['id', 'type', 'iat', 'exp', 'token']);

    res.status(HTTP.ok).json(currentUser);
  }
}

export default new AuthController();
