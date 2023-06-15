import _ from 'lodash';
import helpers from 'helpers';
import CONFIG from 'constants/config';
import USERS from 'constants/user';

export const decodeToken = async (req, res, next, throwError = false) => {
  req.currentUser = {};

  const token = req.headers.authorization && req.headers.authorization.replace('Bearer ', '');

  try {
    if (token) {
      const decodedToken = await helpers.tokenDecode(token);

      req.currentUser = {
        ...decodedToken,
        token,
      };

      return next();
    }

    return throwError ? next(new helpers.errors.Auth()) : next();
  } catch (e) {
    return throwError ? next(new helpers.errors.InvalidToken(e.message)) : next();
  }
};

const checkPermissionScope = (scope = [], permission = []) => {
  const test = (data, value) => data.indexOf(value) > -1;

  return helpers.isEmpty(permission)
    ? true
    : helpers.transform.toArray(permission).some(item => {
        let key = item;
        let flag = test(scope, key);
        while (key !== '' && !flag) {
          key = key.substr(0, key.lastIndexOf('.'));
          flag = test(scope, key);
        }

        return flag;
      });
};

export const checkPermission =
  (permission = []) =>
  async (req, res, next) => {
    const {token} = req.currentUser || {};

    if (helpers.isEmpty(token)) {
      return next(new helpers.errors.Forbidden());
    }

    if (helpers.isEmpty(permission)) {
      return next();
    }

    const userRoleId = _.get(req, 'currentUser.userRoleId', null);
    const userPermissions = _.get(
      Object.values(USERS.roles).find(item => helpers.compareInt(item.id, userRoleId)),
      'permissions',
      []
    );

    if (helpers.isEmpty(userPermissions)) {
      return next(new helpers.errors.Forbidden());
    }

    const allow = checkPermissionScope(userPermissions, permission);
    if (!allow) {
      return next(new helpers.errors.Forbidden());
    }

    return next();
  };

export const checkAuth = (scopes = []) => [decodeToken, checkPermission(scopes)];
