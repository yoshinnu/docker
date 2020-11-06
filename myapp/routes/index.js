const router = require('express').Router();
const authControll = require('../controllers/authController.js');
const indexcontroll = require('../controllers/indexController.js');
router.get('/post', authControll.verifyToken, indexcontroll.getAllPosts);

module.exports = router;