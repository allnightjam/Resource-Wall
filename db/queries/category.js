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

const getCategory = function (category) {
  const queryString =
  `SELECT *
  FROM categories
  WHERE category = $1`;
  const queryParams = [category];
  return db.query(queryString, queryParams).then((res) => res.rows);
};

module.exports = { getCategories, getCategory };
