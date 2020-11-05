const router = require('express').Router();
const authtoken = require('../controllers/authController.js');
const postcontroll = require('../controllers/postController.js');

// GET goto postpage
router.get('/', authtoken.verifyToken, postcontroll.getPostpage);

module.exports = router;