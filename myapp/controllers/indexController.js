const db = require('./databaseController.js');
const FormatClass = require('./class/likesCountInPostsClass');
const format = new FormatClass;
const getAllPosts = async function (req, res) {
  const user = await db.getUserByid(req.decoded.id).catch((error) => {
    console.error(error);
  });
  const posts = await db.getAllPosts().catch(error => {
    console.error(error);
  });
  const likes = await db.getAllPostsLike().catch(error => {
    console.error(error);
  });
  const postData = format.formatPostsData(likes, posts, user);
  return res.json({ postData, user });
}
const createPostLike = async function (req, res) {
  db.createPostLike(req.decoded.id, req.body.postId).catch(error => {
    console.error(error);
  });
  return res.send(200, 'OK');
}
const deletePostLike = async function (req, res) {
  db.deletePostLike(req.decoded.id, req.body.postId).catch(error => {
    console.error(error);
  });
  return res.send(200, 'OK');
}
module.exports = {
  getAllPosts,
  createPostLike,
  deletePostLike
}