const auth = require('./authController.js');
const db = require('./databaseController.js');
const bcrypt = require('bcrypt');

function getLoginpage(req, res) {
  res.render('login', { title: 'Login' });
}

function getLogout(req, res) {
  res.clearCookie('jwt');
  res.render('login', { title: 'Login' });
}
async function loginUser(req, res) {
  const user = await db.getUserByemail(req.body);
  if (user && user.email == req.body.email && bcrypt.compareSync(req.body.password, user.password)) {
    auth.createToken(res, user)
    return res.status(200).render('home.ejs', { title: 'Home', user: user });
  } else {
    return res.status(400).render('login.ejs', { title: 'Login', message: 'アカウントが登録されてません。' })
  }
}
module.exports = {
  loginUser,
  getLoginpage,
  getLogout
};