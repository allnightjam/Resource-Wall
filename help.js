const bcrypt = require('bcryptjs');
const { searchUserByEmail } = require('./db/queries/users');

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

  searchUserByEmail(email).then(res=>{
    console.log(res);
    if(res.count === 0){
      return {err: 'No valid user', user: null};
    }else{
      //find same email, then check the password
      if (!bcrypt.compareSync(password, res[0].password)) {  // Eject clauses
        return {err: 'Email or Password invalid', user: null};
      }else{
        return {err: null, user: res[0]}
      }
    }
  })
}

module.exports = { getUserByEmail, authenticateUser };
