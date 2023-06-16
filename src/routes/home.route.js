const { Router } = require('express');
const isAuth = require("../middlewares/isAuth");
const { home, about, blog, contact, service } = require('../controllers/home.controller');
const router = Router();


router.get('/index', home);
router.get('/about', about);
router.get('/blog', blog);
router.get('/contact', contact);
router.get('/services', service);

module.exports = router;