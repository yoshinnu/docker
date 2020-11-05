const express = require('express');
const router = express.Router();
const registerControll = require('../controllers/registerController');
const reqBodyCheck = require('../controllers/validation/validation.js');
// GET register page
router.get('/', registerControll.getRegisterpage);
// POST register userCreate
router.post('/signup', reqBodyCheck, registerControll.createRegister);

module.exports = router;
