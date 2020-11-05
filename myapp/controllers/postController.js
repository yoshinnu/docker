const db = require('../controllers/databaseController.js');

const getPostpage = async (req, res) => {
  const user = await db.getUserByid(req.decoded.id).catch((error) => {
    console.error(error);
  })
  res.render('post.ejs', { title: 'Post', user: user });
};

module.exports = {
  getPostpage
}