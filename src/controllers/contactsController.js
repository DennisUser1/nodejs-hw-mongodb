import { getContactByIdService } from '../services/contacts.js';
import { getAllContactsService } from '../services/contacts.js';

export const getAllContacts = async (req, res) => {
    try {
        const contacts = await getAllContactsService();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(
            JSON.stringify({
                status: 200,
                message: "Successfully found contacts!",
                data: contacts
            }, null, 2)
        );
    } catch (error) {
        res.status(500).send(
            JSON.stringify({
                status: 500,
                message: "Error fetching contacts",
                error: error.message
            }, null, 2)
        );
    }
};

export const getContactById = async (req, res) => {
    const { contactId } = req.params;

    try {
        const contact = await getContactByIdService(contactId);
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(
            JSON.stringify({
                status: 200,
                message: `Successfully found contact with id ${contactId}!`,
                data: contact
            }, null, 2)
        );
    } catch (error) {
        res.status(500).send(
            JSON.stringify({
                status: 500,
                message: 'Error fetching contact',
                error: error.message
            }, null, 2)
        );
    }
};
