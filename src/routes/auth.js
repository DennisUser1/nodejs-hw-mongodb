import express from 'express';
import {
    getGoogleOAuthUrlController,
    loginWithGoogleController,
    registerUserController, 
    loginUserController, 
    refreshSessionController, 
    logoutUserController,
    sendResetPasswordEmailController,
    resetPasswordController
} from '../controllers/authController.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
    loginWithGoogleOAuthSchema,
    userLoginSchema, 
    userRegisterSchema,
    sendResetPasswordEmailSchema,
    setNewPasswordSchema 
} from '../validation/authValidationSchemas.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';

const router = express.Router();

router.post('/register', validateBody(userRegisterSchema), ctrlWrapper(registerUserController));
router.post('/login', validateBody(userLoginSchema), ctrlWrapper(loginUserController));
router.post('/refresh', ctrlWrapper(refreshSessionController));
router.post('/logout', ctrlWrapper(logoutUserController));
router.post('/send-reset-email', validateBody(sendResetPasswordEmailSchema), ctrlWrapper(sendResetPasswordEmailController));
router.post('/reset-pwd', validateBody(setNewPasswordSchema), ctrlWrapper(resetPasswordController));
router.get('/get-oauth-url', ctrlWrapper(getGoogleOAuthUrlController));
router.post('/confirm-oauth', validateBody(loginWithGoogleOAuthSchema), ctrlWrapper(loginWithGoogleController));

export default router;
