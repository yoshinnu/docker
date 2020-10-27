const model = require("../models")

//insert register
const createuser = async function(res, body){
  registeruser = {
  username: body.name,
  password: body.password,
  email: body.email
};
return  model.Users.create(registeruser)
.then(user =>{
  console.log("Created: ",JSON.stringify(user));
});


};

//checkcount register
const emailcheck =  function(body){
  return model.Users.count({ where: { email:[body.email]} });
};

//select login
const selectuser = function(body){
  return  model.Users.findOne({
    where: {
      password: body.password,
      email: body.email
    }
  });
};
module.exports = {
  createuser,
  selectuser,
  emailcheck
};
