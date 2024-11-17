import ContactsCollection from '../db/models/contactModel.js';

export const getAllContactsService = async (req, res) => {
  const contacts = await ContactsCollection.find();
  return contacts;
};

export const getContactByIdService = async (contactId) => {
  const contact = await ContactsCollection.findById(contactId);
  return contact;
};