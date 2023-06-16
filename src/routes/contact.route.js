const { Router } = require('express');
const isAuth = require('../middlewares/isAuth');
const { getContacts, createContact } = require("../controllers/contact.controller");
const router = Router();


router.get('/contacts', getContacts);
router.post('/contact', createContact);

module.exports = router;