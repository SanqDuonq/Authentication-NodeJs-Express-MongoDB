import express from 'express'
import validateResource from '../middlewares/validate-resource';
import { createUserSchema } from '../schema/user.schema';
import controller from '../controllers/user.controller'
const router = express.Router();

router.post('/api/user', validateResource(createUserSchema), controller.createUserHandler)


export default router;