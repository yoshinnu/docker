const router = require('express').Router();
const authtoken = require('../controllers/authController.js');
const editcontroll = require('../controllers/editController.js');
const validation = require('../controllers/validation/validation.js');
// GET goto editpage
router.get('/', authtoken.verifyToken, editcontroll.getEditpage);
// POST edit post
router.post('/update', authtoken.verifyToken, validation.postCheck, editcontroll.updateSelectPost);
// POST delete post
router.post('/delete', authtoken.verifyToken, editcontroll.deleteSelectPost);
module.exports = router;