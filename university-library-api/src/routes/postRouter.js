import {Router} from 'express';

import helpers from 'helpers';
import {checkAuth} from 'middlewares/auth';
import PostController from 'controllers/PostController';
import PERMISSIONS from 'constants/permissions';

const router = new Router();

router.get('/', helpers.wrapRoute(PostController.getAll));
router.post('/', checkAuth([PERMISSIONS.POSTS_CREATE]), helpers.wrapRoute(PostController.create));
router.get('/:postId', helpers.wrapRoute(PostController.getItem));
router.put('/:postId', checkAuth([PERMISSIONS.POSTS_UPDATE]), helpers.wrapRoute(PostController.update));
router.delete('/:postId', checkAuth([PERMISSIONS.POSTS_DELETE]), helpers.wrapRoute(PostController.delete));

export default router;
