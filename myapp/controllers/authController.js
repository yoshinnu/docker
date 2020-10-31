const jwt = require('jsonwebtoken');

const createToken =
  function (res, user) {
    const options = { expiresIn: '30m' };
    const payload = {
      id: user.id
    };
    const token = jwt.sign(payload, process.env.SECRET_KEY, options);
    return res.cookie('jwt', token, { httpOnly: true });
  };

const verifyToken = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    await jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
      if (!error) {
        req.decoded = decoded;
        next();
      } else {
        return res.status(401).render('login.ejs', { message: 'ログインしてください。', title: 'Login' });
      }
    });
  } else {
    return res.status(401).render('login.ejs', { message: 'ログインしてください。', title: 'Login' });
  }
};
module.exports = {
  createToken,
  verifyToken
}; 