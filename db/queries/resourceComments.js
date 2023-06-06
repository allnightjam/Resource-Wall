const db = require('../connection');

const addComments = function(comment,resourceId,userId) {
  
  const queryString = `INSERT INTO resource_comments(comment, resource_id, user_id) VALUES($1, $2, $3) RETURNING *`;
  
  return db.query(queryString, [comment,resourceId, userId])
    .then(data => {
      return data.rows;
    })
    .catch(error => {
      console.error("Error insert resource_comments in queries:", error);
      throw error;
    });
};

const getComments = function(resourceId) {
  
  const queryString = `SELECT resource_comments.*, users.username, users.avatar 
        FROM resource_comments 
        LEFT JOIN users ON user_id = users.id
        WHERE resource_id = $1`;
  
  return db.query(queryString, [resourceId])
    .then(data => {
      return data.rows;
    })
    .catch(error => {
      console.error("Error get comment from resource_comments in queries:", error);
      throw error;
    });
};

const getTotalComments = function(resourceId) {
  
  const queryString = `SELECT count(*) as total_comments FROM resource_comments WHERE resource_id = $1`;
  
  return db.query(queryString, [resourceId])
    .then(data => {
      return data.rows[0];
    })
    .catch(error => {
      console.error("Error get total comment from resource_comments in queries:", error);
      throw error;
    });
};

module.exports = {addComments, getComments,getTotalComments};