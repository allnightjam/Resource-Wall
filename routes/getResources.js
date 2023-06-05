const express = require('express');
const router  = express.Router();

const resourceQueries = require('../db/queries/resources');
const commentQueries = require('../db/queries/resourceComments');

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
  resourceQueries.getResourceById(id)
    .then((resources) => {
      return commentQueries.getComments(id)
        .then((comments) => {
          return commentQueries.getTotalComments(id)
            .then((totalComments) => {
              res.render('resource', { resources, comments, totalComments});
            });
        });
    })
    .catch((error) => {
      console.error("Error retrieving resource detail:", error);
      res.status(500).json({ error: "Failed to retrieve resource in detail page" });
    });
});

module.exports = router;