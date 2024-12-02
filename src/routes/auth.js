import express from 'express';
import { registerUserController, loginUserController, refreshSessionController, logoutUserController } from '../controllers/authController.js';
import { validateBody } from '../middlewares/validateBody.js';
import { userLoginSchema, userRegisterSchema } from '../validation/authValidationSchemas.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';

const router = express.Router();

router.post('/register', validateBody(userRegisterSchema), ctrlWrapper(registerUserController));
router.post('/login', validateBody(userLoginSchema), ctrlWrapper(loginUserController));
router.post('/refresh', ctrlWrapper(refreshSessionController));
router.post('/logout', ctrlWrapper(logoutUserController));

export default router;
