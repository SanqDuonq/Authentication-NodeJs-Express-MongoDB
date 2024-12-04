import express from 'express'
import validateResource from '../middlewares/validate-resource';
import { createUserSchema, verifyUserSchema } from '../schema/user.schema';
import controller from '../controllers/user.controller'
const router = express.Router();

router.post('/api/user', validateResource(createUserSchema), controller.createUserHandler)
router.post('/api/user/verify/:id/:verificationCode',validateResource(verifyUserSchema),controller.verifyUserHandler)

export default router;