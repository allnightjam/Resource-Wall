const express = require('express');
const router  = express.Router();

const resourceQueries = require('../db/queries/resources');

// GET route handler for /addResource
router.post('/', (req, res) => {
  const resource = req.body;
  resourceQueries.addResource(resource)
    .then((resource) => {
      if (!resource) {
        return res.send({ error: "error" });
      }
      res.redirect('/'); // Redirect to the index page
    })
    .catch((error) => {
      console.error("Error add resource:", error);
      res.status(500).json({ error: "Failed to add resource" });
    });
});

//GET route handler for /getAllResource
// router.get('/', (req, res) => {
//   resourceQueries.getAllResource()
//     .then((resources) => {
//       res.json(resources);
//     })
//     .catch((error) => {
//       console.error("Error retrieving resources:", error);
//       res.status(500).json({ error: "Failed to retrieve resources" });
//     });
// });
module.exports = router;
