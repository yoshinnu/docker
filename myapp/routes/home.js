const router = require('express').Router();
const authtoken = require('../controllers/authtoken_controller.js');

router.get('/', authtoken.verifyToken, (req,res)=> {
  res.render('home.ejs', {title: 'Home', userdata: req.decoded});
});
module.exports = router;