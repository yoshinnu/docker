const model = require("../models");
const bcrypt = require("bcrypt");
//insert register
const createUser = function (body) {
  const password = body.password;
  const hashedpassword = bcrypt.hashSync(password, 10);
  const registerUser = {
    username: body.name,
    password: hashedpassword,
    email: body.email
  };
  return model.Users.create(registerUser);
};
//count user by email
const getUserCountByemail = function (body) {
  return model.Users.count({
    where: {
      email: body.email
    }
  });
};
//select user by email
const getUserByemail = function (body) {
  return model.Users.findOne({
    where: {
      email: body.email
    }
  });
};
//select user by id
const getUserByid = function (userId) {
  return model.Users.findByPk(userId);
};
/**insert post 
 * user_id titles text auther
 */
const createPostData = function (post, user) {
  const userpost = {
    userId: user.id,
    auther: user.username,
    title: post.title,
    text: post.text
  }
  return model.posts.create(userpost);
};
//select post all
const getAllPosts = function () {
  return model.posts.findAll();
};
//select post byid
const getSelectPostByid = function (id) {
  return model.posts.findByPk(id);
};
//update post one
const putSelectPostByid = function (post) {
  const updatepost = {
    text: post.content,
    title: post.title
  }
  return model.posts.update(updatepost, { where: { id: post.id } });
}
//delete post byid
const deleteSelectPostByid = function (id) {
  return model.posts.destroy({ where: { id: id } });
}
module.exports = {
  createUser,
  getUserByemail,
  getUserCountByemail,
  getUserByid,
  createPostData,
  getAllPosts,
  getSelectPostByid,
  putSelectPostByid,
  deleteSelectPostByid
};
