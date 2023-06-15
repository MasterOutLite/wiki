import {Router} from 'express';

import helpers from 'helpers';
import {checkAuth} from 'middlewares/auth';
import UserController from 'controllers/UserController';
import PERMISSIONS from 'constants/permissions';

const router = new Router();

router.get('/', checkAuth([PERMISSIONS.USERS_READ]), helpers.wrapRoute(UserController.getAll));
router.post('/', checkAuth([PERMISSIONS.USERS_CREATE]), helpers.wrapRoute(UserController.create));
router.get('/:userId', checkAuth([PERMISSIONS.USERS_READ]), helpers.wrapRoute(UserController.getItem));
router.put('/:userId', checkAuth([PERMISSIONS.USERS_UPDATE]), helpers.wrapRoute(UserController.update));
router.put('/:userId/role', checkAuth(), helpers.wrapRoute(UserController.updateRole));
router.delete('/:userId', checkAuth([PERMISSIONS.USERS_DELETE]), helpers.wrapRoute(UserController.delete));


export default router;

