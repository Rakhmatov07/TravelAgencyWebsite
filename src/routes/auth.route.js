const { Router } = require('express');
const { logIn, loginGet } = require('../controllers/auth.controller');
const router = Router();


router.post('/login', logIn);
router.get('/login', loginGet); 

module.exports = router;