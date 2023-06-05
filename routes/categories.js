const express = require('express');
const router  = express.Router();

const categoriesQueries = require('../db/queries/category');

// GET route handler for /categories
router.get('/', (req, res) => {
  categoriesQueries.getCategories()
    .then((categories) => {
      res.json(categories);
    })
    .catch((error) => {
      console.error("Error retrieving categories:", error);
      res.status(500).json({ error: "Failed to retrieve categories" });
    });
});
module.exports = router;