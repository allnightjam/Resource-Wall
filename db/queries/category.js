const db = require('../connection');

const getCategories = () => {
  
  return db.query('SELECT * FROM categories')
    .then(data => {
      return data.rows;
    })
    .catch(error => {
      console.error("Error retrieving categories in queries:", error);
      throw error; // Throw the error to propagate it to the caller
    });
};

module.exports = { getCategories };