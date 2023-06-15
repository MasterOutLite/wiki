import HTTP from 'constants/http';
import UserService from 'services/UserService';
import validation, {user} from 'validation';

class UserController {
  async getAll(req, res, next) {
    const data = await UserService.getAll(req.body);

    res.status(HTTP.ok).json(data);
  }

  async create(req, res, next) {
    await validation(req.body, user.createUser);

    const item = await UserService.create(req.body);

    res.status(HTTP.created).json(item);
  }

  async getItem(req, res, next) {
    const item = await UserService.getItem(req.params.userId);

    res.status(HTTP.ok).json(item);
  }

  async update(req, res, next) {
    await validation(req.body, user.updateUser);
    const item = await UserService.update(req.params.userId, req.body);

    res.status(HTTP.ok).json(item);
  }

  async updateRole(req, res, next) {
    await validation(req.body, user.updateUserRole);
    const item = await UserService.updateRole(req.params.userId, req.body, req.currentUser);

    res.status(HTTP.ok).json(item);
  }

  async delete(req, res, next) {
    await UserService.delete(req.params.userId);

    res.status(HTTP.noContent).end();
  }
}

export default new UserController();
