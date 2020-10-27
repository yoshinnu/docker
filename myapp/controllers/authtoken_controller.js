const jwt = require("jsonwebtoken");
const config = require("../config/jwt.config.js");

const createToken =
  function (res, user){
    
    const payload = {
      email: user.email,
      password: user.password
    };
    
    const token =jwt.sign(payload, config.secret, config.options);
    console.log(token);
   return res.cookie("jwt", token, {httpOnly: false});
  };

  const verifyToken = (req, res, next)=>{
    const token = req.cookies.jwt;
    console.log(token);
    if(token) {
      jwt.verify(token, config.secret, (error, decoded) => {
        if(error){
          return  res.render("login.ejs", {message:"トークンの認証に失敗しました",title:"Login"});
        }else{
          console.log("認証成功")
          req.decoded = decoded;
          console.log(req.decoded);
          next ();
        }
      });
    }else{
      return res.render("login.ejs", {title:"Login"});
    }

  };
  module.exports = {
    createToken,
    verifyToken
  }; 