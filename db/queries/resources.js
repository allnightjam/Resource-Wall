const db = require('../connection');

const addResource = function(resource) {
   
  const queryString = `INSERT INTO resources(title, resource_url, photo_url, description, category_id, user_id) VALUES($1, $2, $3, $4, $5, 1 ) RETURNING *`;
  return db.query(queryString, [resource['resource-title'], resource['resource-url'], resource['resource-image'], resource['resource-desc'], resource['resource-category']])
    .then(data => {
      return data.rows;
    })
    .catch(error => {
      console.error("Error insert resource in queries:", error);
      throw error;
    });
};

// const getAllResource = () => {
//   console.log("inside db queries function----------------");
//   return db.query('SELECT * FROM resources')
//     .then(data => {
//       console.log("resources from database *****************", data.rows);
//       return data.rows;
//     })
//     .catch(error => {
//       console.error("Error retrieving resources in queries:", error);
//       throw error; // Throw the error to propagate it to the caller
//     });
// };

module.exports = { addResource };