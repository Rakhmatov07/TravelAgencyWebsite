const IO = require('../utils/io');
const Quote = new IO('./database/quotes.json');
const Service = new IO('./database/services.json');
const User = new IO('./database/users.json');
const Contact = new IO('./database/contacts.json');

const adminPage = async (req, res) => {
    const quotes = await Quote.read();
    const services = await Service.read();
    const contacts = await Contact.read();
    const users = await User.read();
  
  
    res.render("admin", {
      quotes,
      services,
      contacts,
      users
    });
};
  
const addingPage = async(req, res) => {
    res.render("add");
};
  


module.exports = {
    adminPage, 
    addingPage,
}