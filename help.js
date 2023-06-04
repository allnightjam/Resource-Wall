const bcrypt = require('bcryptjs');
const { searchUserByEmail } = require('./db/queries/users');

const isLoggedIn = (id)=>{
  if (id && id !== '') return true;
  return false;
};

const getUserByEmail = (email)=>{
  searchUserByEmail().then(res=>{
    if(res.count === 0){
      return null;
    }else{
      return res[0];
    }
  })
};

const authenticateUser = (email, password) =>{

  return searchUserByEmail(email).then(res=>{
    console.log('-------------------------res=============', res[0]);
    if(res.count === 0){
      return {err: 'No valid user', user: null};
    }else{
      //find same email, then check the password
      if (!bcrypt.compareSync(password, res[0].password)){
        console.log('-------password does not match---------');
        return {err: 'Email or Password invalid', user: null};
      }else{
        console.log('-------password match---------');
        return {err: null, user: res[0]};
      }
    }
  })
}

module.exports = { getUserByEmail, authenticateUser, isLoggedIn };
