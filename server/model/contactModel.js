const mongoose = require('mongoose');
const validator = require('validator');

// Modelling of the contacts
const contactsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name for this contact.'],
        trim: true,
        maxlength: [40, 'A name can have up to 40 characters.']
    },
    email: {
        type: String,
        required: [true, 'Please provide an email for this contact.'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    homeAdress: {
        type: String
    },
    phoneNumbers: [String]
});

const Contacts = mongoose.model('Contacts', contactsSchema);

module.exports = Contacts;











