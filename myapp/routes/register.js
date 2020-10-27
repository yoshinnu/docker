var express = require('express');
var router = express.Router();
const db = require("../controllers/database_controller.js");
const model = require("../models");
const { validationResult } = require("express-validator");
const registercheck = require("../controllers/validation/validation.js");
const registerauth = require("../controllers/authtoken_controller.js");
/* GET register page */
router.get('/', function(req, res) {
  res.render('register', { title: 'register' });
});

router.post("/signup", registercheck,  async (req, res, next) =>{
  let errors = validationResult(req);
  if (!errors.isEmpty()){
    errors =errors.array(); 
    console.error(errors);
    res.render("../views/register.ejs",{ errors, title: "Register"});
    return;
  }
  console.log(req.body);

  await db.createuser(res, req.body)
  registerauth.createToken(res, req.body);
  res.render("home.ejs", {title: "Home",userdata: req.body});
  });

module.exports = router;
