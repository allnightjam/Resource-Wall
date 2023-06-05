const db = require('../connection');

const addRating = function(rating,resourceId,userId) {
  
  const queryString = `INSERT INTO resource_ratings(rating, resource_id, user_id) VALUES($1, $2, $3) RETURNING *`;
  
  return db.query(queryString, [rating,resourceId, userId])
    .then(data => {
      return data.rows;
    })
    .catch(error => {
      console.error("Error insert resource_ratings in queries:", error);
      throw error;
    });
};

const updateRating = function(rating,resourceId,userId) {
  
  const queryString = `UPDATE resource_ratings
                       SET rating = $1 
                       WHERE resource_id = $2 AND user_id = $3 RETURNING *`;
  
  return db.query(queryString, [rating,resourceId, userId])
    .then(data => {
      return data.rows;
    })
    .catch(error => {
      console.error("Error update resource_ratings in queries:", error);
      throw error;
    });
};

const isRated = function(resourceId,userId) {
  
  const queryString = `SELECT * FROM resource_ratings
                      WHERE resource_id = $1 AND user_id = $2`;
  
  return db.query(queryString, [resourceId, userId])
    .then(data => {
      return data.rows[0];
    })
    .catch(error => {
      console.error("Error check isRated resource_ratings in queries:", error);
      throw error;
    });
};

const avgRating = function(resourceId) {
  
  const queryString = `SELECT resource_id, 
                        ROUND(AVG(rating), 1) AS avg_rating
                      FROM resource_ratings
                      GROUP BY resource_id
                      HAVING resource_id = $1`;
  
  return db.query(queryString, [resourceId])
    .then(data => {
      return data.rows[0];
    })
    .catch(error => {
      console.error("Error check isRated resource_ratings in queries:", error);
      throw error;
    });
};
module.exports = {addRating, updateRating, isRated, avgRating};