import express from 'express'
import userRoute from './user.route'
import authRoute from './auth.route'

const router = express.Router();

router.use(userRoute);
router.use(authRoute);

export default router;