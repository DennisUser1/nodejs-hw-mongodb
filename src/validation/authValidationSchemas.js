import Joi from 'joi';
import { emailPatternUserModel } from '../constants/authConstants.js';

export const userRegisterSchema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    email: Joi.string().pattern(emailPatternUserModel).required(),
    password: Joi.string().min(8).required(),
});

export const userLoginSchema = Joi.object({
    email: Joi.string().pattern(emailPatternUserModel).required(),
    password: Joi.string().min(8).required(),
});
