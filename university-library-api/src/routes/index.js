import {Router} from 'express';

import appRoutes from 'routes/appRouter';
import authRoutes from 'routes/authRouter';
import userRoutes from 'routes/userRouter';
import postRoutes from 'routes/postRouter';

const router = new Router();

router.use('/', appRoutes);
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/posts', postRoutes);

export default router;
