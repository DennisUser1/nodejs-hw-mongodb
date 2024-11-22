import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  phoneNumber: {
    type: String,
    required: [true, 'Set phone number for contact'],
  },
  email: {
    type: String,
    validate: {
        validator: function(email) {
            return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
        },
        message: props => `${props.value} is not a valid email!`,
    },
  },
  isFavourite: {
    type: Boolean,
    default: false,
  },
  contactType: {
    type: String,
    enum: ['work', 'home', 'personal'],
    required: true,
    default: 'personal',
  }
}, {
  timestamps: true,
});

const ContactsCollection = mongoose.model('Contact', contactSchema); // contacts
export default ContactsCollection;
