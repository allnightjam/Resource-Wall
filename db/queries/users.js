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
      console.log(`--------------max user id in users table------------${JSON.stringify(data)}`);
      return data.rows[0].max;
    })
    .catch(err=>{
      console.log('get max user id qurey error:', err.stack);
    })
}

const addNewUser = (user) =>{
  return db.query(`INSERT INTO USERS(id, username, email, password, avatar, profile_description) VALUES ($1, $2, $3, $4, $5, $6);`, [`${user.id}` ,`${user.username}`, `${user.email}`, `${user.password}`, `${user.avatar}`, `${user.profile_description}`])
    .then(res=>{
      console.log(res.rows);
    })
    .catch(err=>{
      console.log('add new user qurey error:', err.stack);
    })
}

const searchUserByEmail = (email) =>{
  return db.query(`SELECT * FROM USERS WHERE EMAIL = $1`, [`${email}`])
    .then(res=>{
      console.log(res);
      return res.rows;
    })
    .catch(err=>{
      console.log('searchUserByEmail query error:', err.stack);
    })
}

const getUsersById = (id) => {
  return db.query(`SELECT * FROM users WHERE id = $1;`,[id])
    .then(data => {
      return data.rows;
    });
};

module.exports = { getUsers, getMaxIDFromUsers, addNewUser, searchUserByEmail,getUsersById };
