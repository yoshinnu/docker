const router = require('express').Router();
const authControll = require('../controllers/authController.js');
const indexcontroll = require('../controllers/indexController.js');
//get postdata 
router.get('/post', authControll.verifyToken, indexcontroll.getAllPosts);
//post likecheck
router.post('/likecheck', authControll.verifyToken, indexcontroll.createPostLike);
//post delete postlike
router.post('/deletelike', authControll.verifyToken, indexcontroll.deletePostLike);
module.exports = router;