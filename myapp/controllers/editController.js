const db = require('./databaseController.js');
const { validationResult } = require('express-validator');
//edit画面へ
const getEditpage = async (req, res) => {
  const selectPost = await db.getSelectPostByid(req.query.id).catch(error => {
    console.error(error);
  });
  res.status(200).render('editpost.ejs', { title: 'PostEdit', post: selectPost });
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
  await db.putSelectPostByid(req.body).catch(error => {
    console.error(error);
  });
  res.status(200).render('index.ejs', { title: 'Index' });
};

//delete post byid
const deleteSelectPost = async function (req, res) {
  await db.deleteSelectPostByid(req.body.id).catch(error => {
    console.error(error);
  });
  res.status(200).render('index.ejs', { title: 'Index' });
};
module.exports = {
  getEditpage,
  updateSelectPost,
  deleteSelectPost
}