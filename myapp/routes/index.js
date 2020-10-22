var express = require('express');
var router = express.Router();
const model = require("../models");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express' });
});
router.post("/login",async function(req, res){
  const user = {
    username: req.body.name,
    password: req.body.password
  };
  await model.User.create(user);
  res.render("index",{title: req.body.name});
});
module.exports = router;
