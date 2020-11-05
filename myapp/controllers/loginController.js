const auth = require('./authController.js');
const db = require('./databaseController.js');
const bcrypt = require('bcrypt');
//login画面へ
function getLoginpage(req, res) {
  res.status(200).render('login', { title: 'Login' });
}
//logout処理　token破棄
function getLogout(req, res) {
  res.clearCookie('jwt');
  res.status(200).render('login', { title: 'Login' });
}
/*login処理
 * emailからuser情報取得
 * →　token付与
 * →　投稿画面へ
 */
async function loginUser(req, res) {
  const user = await db.getUserByemail(req.body).catch((error) => {
    console.error(error);
  });
  if (user && user.email === req.body.email && bcrypt.compareSync(req.body.password, user.password)) {
    auth.createToken(res, user)
    return res.status(200).render('post.ejs', { title: 'Post', user: user });
  } else {
    return res.status(400).render('login.ejs', { title: 'Login', message: 'アカウントが登録されてません。' })
  }
}
module.exports = {
  loginUser,
  getLoginpage,
  getLogout
};