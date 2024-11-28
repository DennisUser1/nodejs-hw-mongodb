import ContactsCollection from '../db/models/contactModel.js';
import calculatePaginationData from '../utils/calculatePaginationData.js';
import { sortOrderList } from '../constants/constants.js';

export const getAllContactsService = async ({
  page = 1,
  perPage = 10,
  sortBy = 'name',
  sortOrder = sortOrderList[0],
  filter = {},
}) => {
  if (!sortOrderList.includes(sortOrder)) {
    sortOrder = sortOrderList[0];
  }

  const contactsQuery = ContactsCollection.find();
  if (typeof filter.contactType !== 'undefined') {
    contactsQuery.where('contactType').equals(filter.contactType);
  }
  if (typeof filter.isFavourite !== 'undefined') {
    contactsQuery.where('isFavourite').equals(filter.isFavourite === 'true');
  }

  const skip = page > 0 ? (page - 1) * perPage : 0;
  const total = await ContactsCollection.countDocuments(
    contactsQuery.getFilter(),
  );
  const contacts = await contactsQuery
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder === sortOrderList[1] ? -1 : 1 })
    .exec();

  const paginationData = calculatePaginationData({ total, page, perPage });

  return {
    contacts,
    ...paginationData,
  };
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
