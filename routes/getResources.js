const express = require('express');
const router  = express.Router();

const resourceQueries = require('../db/queries/resources');

// GET route handler for /
router.get('/', (req, res) => {
  resourceQueries.getAllResource()
    .then((resources) => {
      res.render('index',{resources});
    })
    .catch((error) => {
      console.error("Error retrieving resources:", error);
      res.status(500).json({ error: "Failed to retrieve resources" });
    });
});

// GET route handler for /myresources
router.get('/myresources', (req, res) => {
  const userId = 1; //Set userId temporally
  resourceQueries.getResourceByUserId(userId)
    .then((resources) => {
      res.render('myresources',{resources});
    })
    .catch((error) => {
      console.error("Error retrieving myresources:", error);
      res.status(500).json({ error: "Failed to retrieve resources" });
    });
});
module.exports = router;