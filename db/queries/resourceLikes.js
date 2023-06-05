const db = require('../connection');

const addLikes = function(resourceId,userId) {
  
  const queryString = `INSERT INTO resource_likes(liked, resource_id, user_id) VALUES($1, $2, $3) RETURNING *`;
  
  return db.query(queryString, [true,resourceId, userId])
    .then(data => {
      console.log("add likes data from db -----------", data.rows);
      return data.rows;
    })
    .catch(error => {
      console.error("Error insert resource_likes in queries:", error);
      throw error;
    });
};

module.exports = {addLikes};