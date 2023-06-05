const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

const getMaxIDFromResource = () =>{
  return db.query('SELECT MAX(id) FROM RESOURCES')
  .then(data=>{
    return data.rows[0].id;
  })
}

const addResource =

module.exports = { getUsers, getMaxIDFromResource };
