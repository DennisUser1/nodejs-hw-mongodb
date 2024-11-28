import {
  getContactByIdService,
  getAllContactsService,
  createContactService,
  updateContactService,
  deleteContactService,
} from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import httpErrors from 'http-errors';

export const getAllContactsController = async (req, res, next) => {
  try {
    const { page, perPage } = parsePaginationParams(req.query);
    const { sortBy, sortOrder } = parseSortParams(req.query);
    const filter = parseFilterParams(req.query);

    const contacts = await getAllContactsService({page, perPage, sortBy, sortOrder, filter});
    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: {
        data: contacts.contacts, 
        page: contacts.page,
        perPage: contacts.perPage,
        totalItems: contacts.totalItems,
        totalPages: contacts.totalPages,
        hasPreviousPage: contacts.hasPreviousPage,
        hasNextPage: contacts.hasNextPage,
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getContactByIdController = async (req, res, next) => {
  try {
    const { contactId } = req.params;


    const contact = await getContactByIdService(contactId);
    if (!contact) {
      throw httpErrors(404, `Contact with id ${contactId} not found`);
    }
    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

export const createContactController = async (req, res, next) => {
  try {
    const { name, phoneNumber, email, isFavourite, contactType } = req.body;

    if (!name || !phoneNumber || !contactType) {
      throw httpErrors(400, 'Name, phoneNumber, and contactType are required');
    }
    const newContact = await createContactService({
      name,
      phoneNumber,
      email,
      isFavourite,
      contactType,
    });
    res.status(201).json({
      status: 201,
      message: 'Successfully created a contact!',
      data: newContact,
    });
  } catch (error) {
    next(error);
  }
};

export const updateContactController = async (req, res, next) => {
  try {

    const { contactId } = req.params;
    const { name, phoneNumber, email, isFavourite, contactType } = req.body;
    const updatedContact = await updateContactService(contactId, { name, phoneNumber, email, isFavourite, contactType });

    if (!updatedContact) {
      throw httpErrors(404, 'Contact not found');
    }
    res.status(200).json({
      status: 200,
      message: 'Successfully updated a contact!',
      data: updatedContact,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    
    const deletedContact = await deleteContactService(contactId);
    if (!deletedContact) {
      throw httpErrors(404, 'Contact not found');
    }
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};
