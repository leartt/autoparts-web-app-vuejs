const express = require('express');
const router = express.Router();

const Contact = require('../../models/Contact');

router.get('/', async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json(contacts);
    }
    catch (err) {
        res.status(400).json({ err });
    }
});

router.post('/add', async (req, res) => {
    let { name, surname, email, subject, message } = req.body;

    if (name.length < 1 || name.trim() === '') {
        return res.status(400).json({ msg: 'Name should contain 1 or more characters', success: false });
    }
    if (surname.length < 1 || surname.trim() === '') {
        return res.status(400).json({ msg: 'Surname should contain 1 or more characters', success: false });
    }
    if (email.length < 1 || email.trim() === '') {
        return res.status(400).json({ msg: 'Email should be valid', success: false });
    }
    if (message.length < 10 || message.trim() === '') {
        return res.status(400).json({ msg: 'Message should contain 10 or more characters', success: false });
    }
    const newContact = new Contact({
        name,
        surname,
        email,
        subject,
        message
    })

    try {
        const savedContact = newContact.save();
        res.status(200).json({ msg: 'Contact has been submitted successfully', contact: savedContact, success: true });
    }
    catch (err) {
        res.status(400).json({ msg: err, success: false });
    }

});

module.exports = router;