const db = require('../controllers/databaseController.js');
const { validationResult } = require('express-validator');
const auth = require('./authController');
// 新規登録pageへ
function getRegisterpage(req, res) {
  res.status(200).render('register', { title: 'register' });
}
/**新規アカウント作成
 * userdata入力error
 * →　db登録　
 * →　Token作成(cookie)
 * →　投稿一覧pageへ
 */
async function createRegister(req, res, next) {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    errors = errors.array();
    console.error(errors);
    res.status(422).render('../views/register.ejs', { errors, title: 'Register' });
    return;
  }
  const userCount = await db.getUserCountByemail(req.body).catch((error) => {
    console.error(error);
  });
  if (userCount > 0) {
    const message = '登録済みのメールアドレスです。';
    res.status(400).render("register", { title: 'Register', message: message });
  } else {
    const user = await db.createUser(req.body).catch((error) => {
      console.error(error);
    });
    auth.createToken(res, user);
    res.status(200).render('post.ejs', { title: 'Post', user: user });
  }
}

module.exports = {
  createRegister,
  getRegisterpage
};