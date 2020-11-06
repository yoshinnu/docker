const db = require('./databaseController.js');
const FormClass = require('./class/formclass.js');
const format = new FormClass;

const getAllPosts = async function (req, res) {
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
  const posts = [];
  posts.push({ myposts, otherposts });
  console.log(posts[0].myposts[0].id);
  return res.json(posts);
}

module.exports = {
  getAllPosts
}