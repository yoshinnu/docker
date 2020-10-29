const jwt = require('jsonwebtoken');
const config = require('../config/jwt.config.js');

const createToken =
  function (res, user) {

    const payload = {
      email: user.email,
      password: user.password
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY, config.options);
    return res.cookie('jwt', token, { httpOnly: true });
  };

const verifyToken = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
      if (error) {
        return res.render('login.ejs', { message: 'トークンの認証に失敗しました', title: 'Login' });
      } else {
        console.log('認証成功')
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.render('login.ejs', { message: 'ログインしてください。', title: 'Login' });
  }

};
module.exports = {
  createToken,
  verifyToken
}; 