const express = require('express');
const router  = express.Router();

const resourceQueries = require('../db/queries/resources');
const categoryQueries = require('../db/queries/category');

// GET route handler for /addResource
router.post('/', (req, res) => {
  const resource = req.body;
  const userId = req.session.user_id;
  resourceQueries.addResource(resource,userId)
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

router.get('/', (req, res)=>{
  categoryQueries.getCategories().then(data=>{
    let templateVars = {
      resources: data,
    };
    console.log("the templatevars to addresource page :",templateVars);
    return res.render('addresource', templateVars);
  });

});
module.exports = router;
