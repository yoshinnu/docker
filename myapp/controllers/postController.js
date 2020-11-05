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

/**index画面遷移
 * 1 userデータの取得
 * 2 記事を全て取得
 * 3 記事データを仕分け
 * 4 indexpageへ
 */
const getIndexpage = async (req, res) => {
  //1
  const user = await db.getUserByid(req.decoded.id).catch((error) => {
    console.error(error);
  });
  //2
  const postdata = await db.getAllPosts().catch(error => {
    console.error(error);
  });
  //3
  const myposts = format.formatmyPosts(postdata, user.id);
  const otherposts = format.formatOtherPosts(postdata, user.id);
  //4
  res.status(200).render('index.ejs', { title: 'Index', myposts: myposts, otherposts: otherposts, userdata: user });
};

/**新規投稿
 * 1 userデータの取得　
 * 2　記事をdbに登録
 * 3　全ての記事を取得
 * 4　記事データを仕分け
 * 5  indexに遷移
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
  //3
  const postdata = await db.getAllPosts().catch(error => {
    console.error(error);
  });
  //4
  const myposts = format.formatmyPosts(postdata, user.id);
  const otherposts = format.formatOtherPosts(postdata, user.id);
  //5
  res.status(200).render('index.ejs', { title: 'Index', myposts: myposts, otherposts: otherposts, userdata: user });
};
module.exports = {
  getPostpage,
  createPost,
  getIndexpage,
}