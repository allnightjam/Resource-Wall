const db = require('../connection');

const addResource = function(resource,userId) {
  
  const queryString = `INSERT INTO resources(title, resource_url, photo_url, description, category_id, user_id) VALUES($1, $2, $3, $4, $5, $6 ) RETURNING *`;
  // return db.query(queryString, [resource['resource-title'], resource['resource-url'], resource['resource-image'], resource['resource-desc'], resource['resource-category'], userId])
  return db.query(queryString, [resource['title'], resource['resource_url'], resource['photo_url'], resource['description'], resource['category_id'], userId])
    .then(data => {
      console.log(JSON.stringify(data.rows));
      return data.rows;
    })
    .catch(error => {
      console.error("Error insert resource in queries:", error);
      throw error;
    });
};

const getAllResource = () => {
  const queryString = `SELECT resources.*, users.username, users.avatar FROM resources LEFT JOIN users ON resources.user_id = users.id`;
  return db.query(queryString)
    .then(data => {
      return data.rows;
    })
    .catch(error => {
      console.error("Error retrieving resources in queries:", error);
      throw error;
    });
};

const getResourceByUserId = function(userId) {
  const queryString = `SELECT resources.*, users.username, users.avatar FROM resources LEFT JOIN users ON resources.user_id = users.id where user_id = $1`;
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
      console.log(`--------------max resource id in resource table------------${JSON.stringify(data)}`);
      return data.rows[0].max;
    })
    .catch(err => {
      console.log('get max resource id qurey error:', err.stack);
    });
};

const getResourceById = function(id) {
  const queryString = `SELECT resources.*, users.username, users.avatar FROM resources LEFT JOIN users ON resources.user_id = users.id where resources.id = $1`;
  return db.query(queryString, [id])
    .then(data => {
      return data.rows;
    })
    .catch(error => {
      console.error("Error getResourceById in queries:", error);
      throw error;
    });
};

module.exports = { addResource, getAllResource, getResourceByUserId, getMaxIDFromResource, getResourceById};


