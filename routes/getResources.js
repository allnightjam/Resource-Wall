const express = require('express');
const router  = express.Router();

const resourceQueries = require('../db/queries/resources');

// GET route handler for /
router.get('/', (req, res) => {
  const userId = req.session.user_id;
  
  resourceQueries.getAllResource()
    .then((resources) => {
      res.render('index',{resources,userId});
    })
    .catch((error) => {
      console.error("Error retrieving resources:", error);
      res.status(500).json({ error: "Failed to retrieve resources" });
    });
});

// GET route handler for /myresources
router.get('/myresources', (req, res) => {
  const userId = req.session.user_id;
  console.log("get userId from session is ", userId);
  // const userId = 1; //Set userId temporally
  resourceQueries.getResourceByUserId(userId)
    .then((resources) => {
      res.render('myresources',{resources});
    })
    .catch((error) => {
      console.error("Error retrieving myresources:", error);
      res.status(500).json({ error: "Failed to retrieve resources" });
    });
});

router.get('/resource/:id', (req, res) => {

  const id = req.params.id;
  console.log("get id from req:  ", id);
  resourceQueries.getResourceById(id)
    .then((resources) => {
      res.render('resource',{resources});
    })
    .catch((error) => {
      console.error("Error retrieving resource:", error);
      res.status(500).json({ error: "Failed to retrieve resource in detail page" });
    });
});

module.exports = router;