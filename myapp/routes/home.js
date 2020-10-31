const router = require('express').Router();
const authtoken = require('../controllers/authController.js');
const db = require('../controllers/databaseController');

router.get('/', authtoken.verifyToken, async (req, res) => {
  const user = await db.getUserByemail(req.body);
  res.render('home.ejs', { title: 'Home', user: user });
});
module.exports = router;