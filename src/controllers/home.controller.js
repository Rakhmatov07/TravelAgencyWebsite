const IO = require('../utils/io');
const Quote = new IO('./database/quotes.json');
const Service = new IO('./database/services.json');


const home = async(req, res) => {
    const quotes = await Quote.read();
    const services = await Service.read();

    res.render("index", { quotes, services });
}

const about = async(req, res) => {
    res.render("about");
}

const blog = async(req, res) => {
    res.render("blog");
}

const contact = async(req, res) => {
    res.render("contact");
}

const service = async(req, res) => {
    const services = await Service.read();
    res.render("services", {services});
}


module.exports = {
    home,
    about,
    blog,
    contact,
    service
}