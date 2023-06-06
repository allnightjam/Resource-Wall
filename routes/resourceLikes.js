const express = require('express');
const router  = express.Router();

const likesQueries = require('../db/queries/resourceLikes');

router.post('/', (req, res) => {
  console.log("got likes in route");
  const likes = req.body;
  const resourceId = likes['resource-id'];
  const isLiked = likes['isLiked'];
  const userId = req.session.user_id;
  console.log("got likes in route from main page", isLiked);
  likesQueries.checkLikes(resourceId,userId)
    .then((selectLikes) => {
      if (!selectLikes) {
        console.log("no likes on this resource by userid");
        return likesQueries.addLikes(resourceId, userId);
      } else {
        console.log("the resource is liked by user before, so update it", selectLikes);
        return likesQueries.updateLikes(isLiked,resourceId, userId);
      }
    })
    .then((likes) => {
      if (!likes) {
        return res.send({ error: "error" });
      }
      res.redirect('/'); // Redirect to the index page
    })
    .catch((error) => {
      console.error("Error add resource:", error);
      res.status(500).json({ error: "Failed to add/update likes" });
    });
});

router.post('/:id', (req, res) => {
  const likes = req.body;
  const id = req.params.id;
  const resourceId = likes['resource-id'];
  const isLiked = likes['isLiked'];
  const userId = req.session.user_id;
  console.log("got likes from detail page, resource_id is : ", resourceId, isLiked);
  likesQueries.checkLikes(resourceId,userId)
    .then((selectLikes) => {
      if (!selectLikes) {
        console.log("no likes on this resource by userid");
        return likesQueries.addLikes(resourceId, userId);
      } else {
        console.log("the resource is liked by user before, so update it", selectLikes);
        return likesQueries.updateLikes(isLiked,resourceId, userId);
      }
    })
  // likesQueries.addLikes(resourceId,userId)
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
  const isLiked = likes['isLiked'];
  console.log("got likes from main page, resource_id is : ", resourceId, isLiked);
  const userId = req.session.user_id;
  likesQueries.checkLikes(resourceId,userId)
    .then((selectLikes) => {
      if (!selectLikes) {
        console.log("no likes from my page on this resource by userid");
        return likesQueries.addLikes(resourceId, userId);
      } else {
        console.log("the resource is liked by user before, so update it", selectLikes);
        return likesQueries.updateLikes(isLiked,resourceId, userId);
      }
    })
  // likesQueries.addLikes(resourceId,userId)
    .then((likes) => {
      if (!likes) {
        return res.send({ error: "error" });
      }
      res.redirect('/myresources'); // Redirect to the index page
    })
    .catch((error) => {
      console.error("Error add resource:", error);
      res.status(500).json({ error: "Failed to add likes on myresource" });
    });
});


module.exports = router;