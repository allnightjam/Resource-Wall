const db = require('../connection');

const addLikes = function(resourceId,userId) {
  
  const queryString = `INSERT INTO resource_likes(liked, resource_id, user_id) VALUES($1, $2, $3) RETURNING *`;
  
  return db.query(queryString, [true,resourceId, userId])
    .then(data => {
      return data.rows;
    })
    .catch(error => {
      console.error("Error insert resource_likes in queries:", error);
      throw error;
    });
};

const updateLikes = function(liked,resourceId,userId) {
  const queryString = `UPDATE resource_likes
                       SET liked = $1 
                       WHERE resource_id = $2 AND user_id = $3 RETURNING *`;
  
  return db.query(queryString, [liked,resourceId, userId])
    .then(data => {
      return data.rows;
    })
    .catch(error => {
      console.error("Error update resource_likes in queries:", error);
      throw error;
    });
};

const checkLikes = function(resourceId,userId) {
  const queryString = `SELECT * FROM resource_likes
                       WHERE resource_id = $1 AND user_id = $2`;
  
  return db.query(queryString, [resourceId, userId])
    .then(data => {
      return data.rows;
    })
    .catch(error => {
      console.error("Error checklikes from resource_likes in queries:", error);
      throw error;
    });
};

module.exports = {addLikes,updateLikes, checkLikes};