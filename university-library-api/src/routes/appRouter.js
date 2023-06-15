import {Router} from 'express';

import helpers from 'helpers';
import AppController from 'controllers/AppController';

const router = new Router();
router.get('/', helpers.wrapRoute(AppController.getAppVersion));

export default router;
