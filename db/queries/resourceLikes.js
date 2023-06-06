const db = require('../connection');

const addLikes = function(resourceId,userId) {
  
  const queryString = `INSERT INTO resource_likes(liked, resource_id, user_id) VALUES($1, $2, $3) RETURNING *`;
  
  return db.query(queryString, [true,resourceId, userId])
    .then(data => {
      console.log("add likes to table ", data.rows[0]);
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
      console.log("update likes table ", data.rows[0]);
      return data.rows[0];
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
      return data.rows[0];
    })
    .catch(error => {
      console.error("Error checklikes from resource_likes in queries:", error);
      throw error;
    });
};

const totalLikesByResourceId = function(resourceId) {
  const queryString = `SELECT resource_id, count(resource_likes.id) as t_likes 
                      FROM  resource_likes
                      WHERE resource_id = $1 and liked = true
                      GROUP BY resource_id`;
  
  return db.query(queryString, [resourceId])
    .then(data => {
      console.log("total likes from db for resourceid :",data.rows[0]);
      return data.rows[0];
    })
    .catch(error => {
      console.error("Error get total likes by r_id from resource_likes in queries:", error);
      throw error;
    });
};

module.exports = {addLikes,updateLikes, checkLikes, totalLikesByResourceId};