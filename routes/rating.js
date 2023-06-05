const express = require('express');
const router  = express.Router();

const ratingQueries = require('../db/queries/ratings');

router.post('/', (req, res) => {
  const data = req.body;
  const resourceId = data['resource-id'];
  const ratingtStar = data['rating'];
  const userId = req.session.user_id;

  ratingQueries.isRated(resourceId,userId)
    .then((selectRating) => {
      if (!selectRating) {
        return ratingQueries.addRating(ratingtStar,resourceId,userId);
      } else {
        return ratingQueries.updateRating(ratingtStar,resourceId,userId);
      }
    })
    .then((rating) => {
      if (!rating) {
        return res.send({ error: "error" });
      }
      res.redirect(`/resource/${resourceId}`);
    })
    .catch((error) => {
      console.error("Error add/update rating:", error);
      res.status(500).json({ error: "Failed to add/update rating" });
    });
});

module.exports = router;