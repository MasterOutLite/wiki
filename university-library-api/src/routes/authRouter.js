import {Router} from 'express';

import helpers from 'helpers';
import {checkAuth} from 'middlewares/auth';
import AuthController from 'controllers/AuthController';

const router = new Router();

router.post('/login', helpers.wrapRoute(AuthController.login));
router.post('/logout', checkAuth, helpers.wrapRoute(AuthController.logout));
router.get('/getInfo', checkAuth, helpers.wrapRoute(AuthController.getInfo));

export default router;
