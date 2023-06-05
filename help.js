const {searchUserByEmail} = require('./db/queries/users');

const getUserByEmail = (email)=>{
  searchUserByEmail().then(res=>{
    if(res.count === 0){
      return null;
    }else{
      return res[0];
    }
  })
};


module.exports = { getUserByEmail };
