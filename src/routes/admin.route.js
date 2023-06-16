const { Router } = require('express');
const isAuth = require("../middlewares/isAuth");
const { adminPage, addingPage } = require('../controllers/admin.controller')
const router = Router();

router.get("/admin", isAuth, adminPage);
router.get("/add", isAuth, addingPage);

module.exports = router;