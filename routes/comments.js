const express = require('express');
const router  = express.Router();

const commentQueries = require('../db/queries/resourceComments');

router.post('/', (req, res) => {
  const data = req.body;
  console.log("data from add comment req:", data);
  const resourceId = data['resource-id'];
  const comment = data['comments'];
  const userId = req.session.user_id;
  commentQueries.addComments(comment,resourceId,userId)
    .then((comment) => {
      if (!comment) {
        return res.send({ error: "error" });
      }
      res.redirect(`/resource/${resourceId}`);
    })
    .catch((error) => {
      console.error("Error add comment:", error);
      res.status(500).json({ error: "Failed to add comment" });
    });
});

module.exports = router;