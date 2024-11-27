import Joi from 'joi';
import { contactTypeList, phoneNumberPattern, emailPattern } from '../constants/constants.js';

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': `"name" must be a string`,
    'string.empty': `"name" cannot be empty`,
    'string.min': `"name" should have at least {#limit} characters`,
    'string.max': `"name" should have at most {#limit} characters`,
    'any.required': `"name" is a required field`,
  }),
  phoneNumber: Joi.string().min(13).max(20).pattern(phoneNumberPattern).required().messages({
    'string.empty': `"phoneNumber" cannot be empty`,
    'string.min': `"phoneNumber" should have at least {#limit} characters`,
    'string.max': `"phoneNumber" should have at most {#limit} characters`,
    'string.pattern.base':
      `"phoneNumber" must be in the format: +380XXXXXXXXX, without spaces`,
    'any.required': `"phoneNumber" is a required field`,
  }),
  email: Joi.string().pattern(emailPattern).optional().messages({
    'string.pattern.base': `"email" must be a valid email address`,
  }),
  isFavourite: Joi.boolean().optional().messages({
    'boolean.base': `Value should be a boolean (true or false)`,
  }),
  contactType: Joi.string().valid(...contactTypeList).required().messages({
    'any.only': `"contactType" must be one of [work, home, personal]`,
    'any.required': `"contactType" is a required field`,
  }),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).optional().messages({
    'string.base': `"name" must be a string`,
    'string.min': `"name" should have at least {#limit} characters`,
    'string.max': `"name" should have at most {#limit} characters`,
    'any.required': `"name" is a required field`,
  }),
  phoneNumber: Joi.string().min(13).max(20).pattern(phoneNumberPattern).optional().messages({
    'string.pattern.base':
      `"phoneNumber" must be in the format: +380XXXXXXXXX, without spaces`,
  }),
  email: Joi.string().pattern(emailPattern).optional(),
  isFavourite: Joi.boolean().optional(),
  contactType: Joi.string().valid(...contactTypeList).optional(),
});
