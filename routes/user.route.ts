import express from 'express'
import validateResource from '../middlewares/validate-resource';
import { createUserSchema, forgotPasswordSchema, verifyUserSchema, ResetPasswordInput, resetPasswordSchema } from '../schema/user.schema';
import controller from '../controllers/user.controller'
const router = express.Router();

router.post('/api/user', validateResource(createUserSchema), controller.createUserHandler)
router.post('/api/user/verify/:id/:verificationCode',validateResource(verifyUserSchema),controller.verifyUserHandler)
router.post('/api/user/forgot-password',validateResource(forgotPasswordSchema),controller.forgotPasswordHandler)
router.post('/api/user/reset-password/:id/:passwordResetCode',validateResource(resetPasswordSchema),controller.resetPasswordHandler)
export default router;
