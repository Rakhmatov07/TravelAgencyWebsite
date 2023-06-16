const IO = require("../utils/io");
const Quote = new IO('./database/quotes.json');
const Model = require("../models/quote");
const { v4: uuid } = require("uuid");
const path = require('path');
const fs = require('fs').promises;

const getQuotes = async(req, res) => {
    const quotes = await Quote.read();
    res.redirect('admin', {quotes});
};

const createQuote = async(req, res) => {
    try {
            // Read elements
        const quotes = await Quote.read();
        const { name, job, message } = req.body;
        const { image } = req.files;
            // Check Quote exists or not
        const findQuote = quotes.find(quote => quote.name === name && quote.message === message);
        if(findQuote){
            return res.redirect('admin');
        }

            // Create new Quote
        const imageName = `${uuid()}${path.extname(image.name)}`
        const newQuote = new Model(name, job, imageName, message);
        image.mv(process.cwd() + '/uploads/' + imageName)
        const data = quotes.length ? [...quotes, newQuote] : [newQuote];
        await Quote.write(data);
        res.redirect('admin');
    } catch (error) {
        
    }
}

const deleteQuote = async(req, res) => {
    try {
        const quotes = await Quote.read();
        const { id } = req.body;
        const deletedQuote = quotes.find(quote => quote.id === id);
        const filteredQuotes = quotes.filter((quote) => quote.id !== id);
        const filePath = `/uploads/${deletedQuote.image}`;
        fs.unlink(process.cwd() + filePath, (error) => {
            if (error) {
                console.error('Error deleting file:', error);
              } else {
                console.log('File deleted successfully');
              }
        });
    
        await Quote.write(filteredQuotes);
        res.status(200).json({message: "Deleted"})
    } catch (error) {
        console.log(error);
        res.status(400).json({message: "Bad"})
    }
}

module.exports = {
    getQuotes,
    createQuote,
    deleteQuote,
}