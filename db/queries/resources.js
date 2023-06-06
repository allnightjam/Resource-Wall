const db = require('../connection');

const addResource = function(resource) {

  const queryString = `INSERT INTO resources(id, title, resource_url, photo_url, description, category_id, user_id) VALUES($1, $2, $3, $4, $5, $6, $7 ) RETURNING *`;
  return db.query(queryString, [`${resource.id}`, `${resource.title}`, `${resource.description}`, `${resource.resource_url}`, `${resource.photo_url}`, `${resource.category_id}`, `${resource.user_id}`])
    .then(data => {
      return data.rows;
    })
    .catch(error => {
      console.error("Error insert resource in queries:", error);
      throw error;
    });
};

const getMaxIDFromResource = () =>{
  return db.query('SELECT MAX(id) FROM RESOURCES')
  .then(data=>{
    console.log(`--------------max resource id in resource table------------${JSON.stringify(data)}`);
    return data.rows[0].max;
  })
  .catch(err=>{
    console.log('get max resource id qurey error:', err.stack);
  })
}


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

module.exports = { addResource, getMaxIDFromResource };
