const IO = require("../utils/io");
const Contact = new IO('./database/contacts.json');
const Model = require("../models/contact");

const getContacts = async(req, res) => {
    const contacts = await Contact.read();
    res.status(200).json({message: "success", contacts});
};

const createContact = async(req, res) => {
        // Read elements
    const contacts = await Contact.read();
    const { name, phone, email, message } = req.body;
        // Check contact exists or not
    const findContact = contacts.find(contact => contact.email === email && contact.message === message);
    if(findContact){
        return res.redirect('contact');
    }

        // Create new Contact
    const newContact = new Model(name, phone, email, message);
    
    const data = contacts.length ? [...contacts, newContact] : [newContact];
    await Contact.write(data);
    res.redirect('contact');
}


module.exports = {
    getContacts,
    createContact,
}