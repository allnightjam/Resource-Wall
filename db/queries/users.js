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
    });
};

const addNewUser = (user) =>{
  return db.query(`INSERT INTO USERS(id, username, email, password, avatar, profile_description) VALUES ($1, $2, $3, $4, $5, $6);`, [`${user.id}` ,`${user.username}`, `${user.email}`, `${user.password}`, `${user.avatar}`, `${user.profile_description}`])
    .then(res=>{
      console.log(res.rows);
    })
    .catch(err=>{
      console.log('add new user qurey error:', err.stack);
    });
};

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

const updateProfile = (data,userId)=> {
  if (data.description === '') {
    return db.query(`UPDATE users SET avatar = $1 where id = $2 RETURNING *`, [data.avatar_url, userId])
      .then(res => {
        return res.rows;
      })
      .catch(err => {
        console.log('UPDATE user set description qurey error:', err.stack);
      });
  }
  if (data.avatar_url === '') {
    return db.query(`UPDATE users SET profile_description = $1 where id = $2 RETURNING *`, [data.description, userId])
      .then(res => {
        return res.rows;
      })
      .catch(err => {
        console.log('UPDATE user set avatar qurey error:', err.stack);
      });
  }
  
  return db.query(`UPDATE users SET avatar = $1, profile_description = $2 where id = $3 RETURNING *`, [data.avatar_url, data.description, userId])
    .then(res => {
      return res.rows;
    })
    .catch(err => {
      console.log('UPDATE user avatar and description qurey error:', err.stack);
    });

};

module.exports = { getUsers, getMaxIDFromUsers, addNewUser, searchUserByEmail,getUsersById,updateProfile};
