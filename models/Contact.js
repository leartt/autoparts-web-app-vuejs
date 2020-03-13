const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ContactSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,  
    },
    subject: {
        type: String,
    },
    message: {
        type: String,
        required: true,
    }

});

const Contact = mongoose.model('Contact', ContactSchema);

module.exports = Contact;