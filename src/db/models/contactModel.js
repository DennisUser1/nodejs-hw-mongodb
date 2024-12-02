import mongoose from 'mongoose';
import { contactTypeList, phoneNumberPattern, emailPattern } from '../../constants/contactsConstants.js';

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  phoneNumber: {
    type: String,
    match: phoneNumberPattern,
    required: [true, 'Set phone number for contact'],
  },
  email: {
    type: String,
    match: emailPattern,
  },
  isFavourite: {
    type: Boolean,
    default: false,
  },
  contactType: {
    type: String,
    enum: contactTypeList,
    required: true,
    default: 'personal',
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
}, {
  timestamps: true,
  versionKey: false,
});

const ContactsCollection = mongoose.model('Contact', contactSchema); // contacts
export default ContactsCollection;
