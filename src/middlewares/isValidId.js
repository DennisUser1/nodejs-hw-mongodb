import createHttpErrors from 'http-errors';
import mongoose from 'mongoose';

export function isValidId (req, res, next) {
  const { contactId} = req.params;
  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    return next(createHttpErrors(400, 'Invalid ID format'));
  }
  next();
}
