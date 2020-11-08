const db = require('./databaseController.js');

const getAllPosts = async function (req, res) {
  const user = await db.getUserByid(req.decoded.id).catch((error) => {
    console.error(error);
  });
  const postData = await db.getAllPosts().catch(error => {
    console.error(error);
  });
  return res.json({ postData, user });
}

module.exports = {
  getAllPosts
}