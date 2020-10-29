const express = require('express');
const router = express.Router();
const loginauth = require('../controllers/authtoken_controller.js');
const db = require('../controllers/database_controller.js');

router.get('/', (req, res) => {
  res.render('login', { title: 'Login' });
});

router.get('/logout', (req, res) => {
  res.cookie('jwt', "", { httpOnly: true });
  res.render('login', { title: 'Login' });
});

router.post('/login', async (req, res) => {
  const user = await db.selectuser(req.body);
  console.log(user);
  if (user && user.email == req.body.email) {
    loginauth.createToken(res, user)
    return res.render('home.ejs', { title: 'Home', user: user });
  } else {
    return res.render('login.ejs', { title: 'Login', message: 'アカウントが登録されてません。' })
  }

});
module.exports = router;