const express = require('express');
const router  = express.Router();

const likesQueries = require('../db/queries/resourceLikes');

router.post('/', (req, res) => {
  const likes = req.body;
  const resourceId = likes['resource-id'];
  const userId = req.session.user_id;
  likesQueries.addLikes(resourceId,userId)
    .then((likes) => {
      if (!likes) {
        return res.send({ error: "error" });
      }
      res.redirect('/'); // Redirect to the index page
    })
    .catch((error) => {
      console.error("Error add resource:", error);
      res.status(500).json({ error: "Failed to add likes" });
    });
});

router.post('/:id', (req, res) => {
  const likes = req.body;
  const id = req.params.id;
  const resourceId = likes['resource-id'];
  const userId = req.session.user_id;
  likesQueries.addLikes(resourceId,userId)
    .then((likes) => {
      if (!likes) {
        return res.send({ error: "error" });
      }
      res.redirect(`/resource/${id}`); // Redirect to the index page
    })
    .catch((error) => {
      console.error("Error add resource:", error);
      res.status(500).json({ error: "Failed to add likes" });
    });
});

router.post('/addlikesOnMyresource', (req, res) => {
  const likes = req.body;
  const resourceId = likes['resource-id'];
  const userId = req.session.user_id;
  likesQueries.addLikes(resourceId,userId)
    .then((likes) => {
      if (!likes) {
        return res.send({ error: "error" });
      }
      res.redirect('/myresources'); // Redirect to the index page
    })
    .catch((error) => {
      console.error("Error add resource:", error);
      res.status(500).json({ error: "Failed to add likes" });
    });
});


module.exports = router;