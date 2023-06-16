const { Router } = require('express');
const isAuth = require('../middlewares/isAuth');
const { createService, deleteService, getServices } = require("../controllers/service.controller"); 
const router = Router();


router.get('/services', getServices);
router.post('/service', isAuth, createService);
router.post('/service/delete', isAuth, deleteService);

module.exports = router;