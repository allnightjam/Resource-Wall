const db = require('../connection');

const addResource = function(resource,userId) {
  
  const queryString = `INSERT INTO resources(title, resource_url, photo_url, description, category_id, user_id) VALUES($1, $2, $3, $4, $5, $6 ) RETURNING *`;
  return db.query(queryString, [resource['resource-title'], resource['resource-url'], resource['resource-image'], resource['resource-desc'], resource['resource-category'], userId])
    .then(data => {
      return data.rows;
    })
    .catch(error => {
      console.error("Error insert resource in queries:", error);
      throw error;
    });
};

const getAllResource = () => {
  return db.query('SELECT * FROM resources')
    .then(data => {
      return data.rows;
    })
    .catch(error => {
      console.error("Error retrieving resources in queries:", error);
      throw error;
    });
};

const getResourceByUserId = function(userId) {
  const queryString = `SELECT * FROM resources where user_id = $1`;
  return db.query(queryString, [userId])
    .then(data => {
      return data.rows;
    })
    .catch(error => {
      console.error("Error getResourceByUserId in queries:", error);
      throw error;
    });
};

const getMaxIDFromResource = () => {
  return db.query('SELECT MAX(id) FROM RESOURCES')
    .then(data => {
      return data.rows[0].id;
    });
};

module.exports = { addResource, getAllResource, getResourceByUserId, getMaxIDFromResource};

