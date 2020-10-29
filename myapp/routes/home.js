const router = require('express').Router();
const authtoken = require('../controllers/authtoken_controller.js');
const db = require('../controllers/database_controller');

router.get('/', authtoken.verifyToken, async (req, res) => {
  const user = await db.selectuser(req.decoded);
  res.render('home.ejs', { title: 'Home', user: user });
});
module.exports = router;