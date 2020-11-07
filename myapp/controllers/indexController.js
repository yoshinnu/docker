const db = require('./databaseController.js');
const FormClass = require('./class/formclass.js');
const format = new FormClass;

const getAllPosts = async function (req, res) {
  //1
  const user = await db.getUserByid(req.decoded.id).catch((error) => {
    console.error(error);
  });
  //2
  const postData = await db.getAllPosts().catch(error => {
    console.error(error);
  });
  //3
  const myPosts = format.formatmyPosts(postData, user.id);
  const otherPosts = format.formatOtherPosts(postData, user.id);
  const posts = [];
  posts.push({ myPosts, otherPosts });
  return res.json(posts);
}

module.exports = {
  getAllPosts
}