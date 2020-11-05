const router = require('express').Router();
const authtoken = require('../controllers/authController.js');
const postcontroll = require('../controllers/postController.js');
const validation = require('../controllers/validation/validation.js');
// GET goto postpage
router.get('/', authtoken.verifyToken, postcontroll.getPostpage);
// GET goto indexpage
router.get('/index', authtoken.verifyToken, postcontroll.getIndexpage);
// POST create post
router.post('/create', authtoken.verifyToken, validation.postCheck, postcontroll.createPost);
module.exports = router;