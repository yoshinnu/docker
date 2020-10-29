const model = require("../models");
const bcrypt = require("bcrypt");
//insert register
const createuser = async function (res, body) {
  const password = body.password;
  let hashed_password = bcrypt.hashSync(password, 10);
  console.log(hashed_password);
  let registeruser = {
    username: body.name,
    password: hashed_password,
    email: body.email
  };
  return model.Users.create(registeruser)
    .then(user => {
      console.log("Created: ", JSON.stringify(user));
    });
};

//checkcount register
const emailcheck = function (body) {
  return model.Users.count({ where: { email: [body.email] } });
};

//select login
const selectuser = function (body) {
  return model.Users.findOne({
    where: {
      id: body.id
    }
  });
};
module.exports = {
  createuser,
  selectuser,
  emailcheck
};
