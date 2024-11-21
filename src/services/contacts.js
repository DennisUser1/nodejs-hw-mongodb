import ContactsCollection from '../db/models/contactModel.js';

export const getAllContactsService = async (req, res) => {
  const contacts = await ContactsCollection.find();
  return contacts;
};

export const getContactByIdService = async (contactId) => {
  const contact = await ContactsCollection.findById(contactId);
  return contact;
};

export const createContactService = async (contactData) => {
  const newContact = new ContactsCollection(contactData);
  return await newContact.save();
};

export const updateContactService = async (contactId, updateDate) => {
  const updatedContact = await ContactsCollection.findByIdAndUpdate(
    contactId,
    updateDate,
    { new: true },
  );
  return updatedContact;
};

export async function deleteContactService(contactId) {
 const contact = await ContactsCollection.findByIdAndDelete(contactId);
 return contact;
}
