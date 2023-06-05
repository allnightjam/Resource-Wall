const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};


const getMaxIDFromUsers = () =>{
  return db.query('SELECT MAX(id) FROM USERS;')
    .then(data=>{
      return data.rows[0].id;
    })
}

const addNewUser = (user) =>{
  return db.query(`INSERT INTO USERS(id, username, email, password) VALUES ($1, $2, $3, $4);`, [`${user.id}` ,`${user.username}`, `${user.email}`, `${user.password}`])
    .then(res=>{
      console.log(res.rows);
    })
    .catch(err=>{
      console.log('qurey error:', err.stack);
    })
}

const searchUserByEmail = (email) =>{
  return db.query(`SELECT * FROM USERS WHERE EMAIL = $1`, [`${email}`])
    .then(res=>{
      return res.rows;
    })
    .catch(err=>{
      console.log('query error:', err.stack);
    })
}

module.exports = { getUsers, getMaxIDFromUsers, addNewUser, searchUserByEmail };
