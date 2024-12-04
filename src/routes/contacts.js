import express from 'express';
import {
  getAllContactsController,
  getContactController,
  createContactController,
  updateContactController,
  deleteContactController,
} from '../controllers/contactsController.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import { createContactSchema, updateContactSchema } from '../validation/contactValidationSchemas.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = express.Router();

router.use(authenticate);

router.get('/', ctrlWrapper(getAllContactsController));
router.get('/:contactId', isValidId, ctrlWrapper(getContactController));
router.post('/', validateBody(createContactSchema), ctrlWrapper(createContactController));
router.patch('/:contactId', isValidId, validateBody(updateContactSchema), ctrlWrapper(updateContactController));
router.delete('/:contactId', isValidId, ctrlWrapper(deleteContactController));

export default router;
