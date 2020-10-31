const express = require('express');
const router = express.Router();
const loginControll = require('../controllers/loginController.js');
// GET goto login page
router.get('/', loginControll.getLoginpage);
// GET logout 
router.get('/logout', loginControll.getLogout);
// POST goto homepage
router.post('/login', loginControll.loginUser);
module.exports = router;