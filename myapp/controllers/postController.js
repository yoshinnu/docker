const db = require('../controllers/databaseController.js');
const FormClass = require('./class/formclass.js');
const format = new FormClass;
const { validationResult } = require('express-validator');
//postpageへ
const getPostpage = async (req, res) => {
  const user = await db.getUserByid(req.decoded.id).catch((error) => {
    console.error(error);
  });
  res.render('post.ejs', { title: 'Post', user: user });
};

//index画面遷移
const getIndexpage = async (req, res) => {
  res.status(200).render('index.ejs', { title: 'Index' });
};

/**新規投稿
 * 1 userデータの取得　
 * 2　記事をdbに登録
 * 3  indexに遷移
 */
const createPost = async (req, res) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    errors = errors.array();
    console.error(errors);
    res.status(422).render('post.ejs', { errors, title: 'Post' });
    return;
  }
  const post = {
    title: req.body.title,
    text: req.body.content
  };

  // 1
  const user = await db.getUserByid(req.decoded.id).catch((error) => {
    console.error(error);
  });
  //2
  await db.createPostData(post, user).catch(error => {
    console.error(error);
  });
  res.status(200).render('index.ejs', { title: 'Index' });
};
module.exports = {
  getPostpage,
  createPost,
  getIndexpage,
}