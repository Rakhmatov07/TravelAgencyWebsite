const { Router } = require('express');
const isAuth = require('../middlewares/isAuth');
const { getQuotes, createQuote, deleteQuote } = require("../controllers/quote.controller");
const router = Router();


router.get('/quote', getQuotes);
router.post('/quote', isAuth, createQuote);
router.post('/quote/delete', isAuth, deleteQuote);

module.exports = router;