const db = require('./databaseController.js');
const FormClass = require('./class/formclass.js');
const format = new FormClass;
const { validationResult } = require('express-validator');
//edit画面へ
const getEditpage = async (req, res) => {
  const selectpost = await db.getSelectPostByid(req.query.id).catch(error => {
    console.error(error);
  });
  console.log(selectpost);
  res.status(200).render('editpost.ejs', { title: 'PostEdit', post: selectpost });
};

//editerpost update
const updateSelectPost = async function (req, res) {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    errors = errors.array();
    console.error(errors);
    res.status(422).render('post.ejs', { errors, title: 'Post' });
    return;
  }
  const user = await db.getUserByid(req.decoded.id).catch((error) => {
    console.error(error);
  });

  await db.putSelectPostByid(req.body).catch(error => {
    console.error(error);
  });
  const postdata = await db.getAllPosts().catch(error => {
    console.error(error);
  });
  const myposts = format.formatmyPosts(postdata, user.id);
  const otherposts = format.formatOtherPosts(postdata, user.id);
  res.status(200).render('index.ejs', { title: 'Index', myposts: myposts, otherposts: otherposts, userdata: user });
};

//delete post byid
const deleteSelectPost = async function (req, res) {
  const user = await db.getUserByid(req.decoded.id).catch((error) => {
    console.error(error);
  });
  await db.deleteSelectPostByid(req.body.id).catch(error => {
    console.error(error);
  });
  const postdata = await db.getAllPosts().catch(error => {
    console.error(error);
  });
  const myposts = format.formatmyPosts(postdata, user.id);
  const otherposts = format.formatOtherPosts(postdata, user.id);
  res.status(200).render('index.ejs', { title: 'Index', myposts: myposts, otherposts: otherposts, userdata: user });
};
module.exports = {
  getEditpage,
  updateSelectPost,
  deleteSelectPost
}