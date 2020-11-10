const express = require('express');
const router = express.Router();
const registerControll = require('../controllers/registerController');
const validation = require('../controllers/validation/validation.js');
// GET register page
router.get('/', registerControll.getRegisterpage);
// POST register userCreate
router.post('/signup', validation.signupCheck, registerControll.createRegister);

module.exports = router;
