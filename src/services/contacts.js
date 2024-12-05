import ContactsCollection from '../db/models/contactModel.js';
import calculatePaginationData from '../utils/calculatePaginationData.js';
import { sortOrderList } from '../constants/contactsConstants.js';

export const getAllContactsService = async ({
  userId,
  page = 1,
  perPage = 10,
  sortBy = 'name',
  sortOrder = sortOrderList[0],
  filter = {},
}) => {
  if (!sortOrderList.includes(sortOrder)) {
    sortOrder = sortOrderList[0];
  }

  const contactsQuery = ContactsCollection.find({ userId });
  if (filter.type) {
    contactsQuery.where('contactType').equals(filter.type);
  }
  if (filter.isFavourite !== undefined) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite === 'true');
  }

  const skip = page > 0 ? (page - 1) * perPage : 0;
  const [total, contacts] = await Promise.all([
    ContactsCollection.find(contactsQuery).countDocuments(),
    contactsQuery
      .skip(skip)
      .limit(perPage)
      .sort({ [sortBy]: sortOrder === sortOrderList[1] ? -1 : 1 })
      .exec(),
  ]);
  const paginationData = calculatePaginationData({ total, page, perPage });

  return {
    contacts,
    ...paginationData,
  };
};

export const getContactService = async (contactId, userId) => {
  const contact = await ContactsCollection.findOne({
    _id: contactId,
    userId,
  });
  return contact;
};

export const createContactService = async (contactData) => {
  const newContact = new ContactsCollection(contactData);
  return await newContact.save();
};

export const updateContactService = async (contactId, updateDate, userId) => {
  const updatedContact = await ContactsCollection.findOneAndUpdate(
    { _id: contactId, userId },
    updateDate,
    { new: true },
  );
  return updatedContact;
};

export async function deleteContactService(contactId, userId) {
  const contact = await ContactsCollection.findOneAndDelete({
    _id: contactId,
    userId,
  });
  return contact;
};
