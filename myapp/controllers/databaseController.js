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
module.exports = {
  createUser,
  getUserByemail,
  getUserCountByemail
};
