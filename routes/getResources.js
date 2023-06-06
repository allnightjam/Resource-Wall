const express = require('express');
const router  = express.Router();

const resourceQueries = require('../db/queries/resources');
const commentQueries = require('../db/queries/resourceComments');
const ratingQueries = require('../db/queries/ratings');
const categoryQueries = require('../db/queries/category');

// GET route handler for /
router.get('/', (req, res) => {
  const userId = req.session.user_id;
  const { category_id } = req.query;
  console.log("let is see what is req.query when select category",req.query);
  const resourceQuery = category_id ? resourceQueries.getResourceByCategoryId(category_id) : resourceQueries.getAllResource();
  Promise.all([resourceQuery, categoryQueries.getCategories()])
    .then((data) => {
      res.render('index',{resources: data[0], categories: data[1], userId});
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
  // resourceQueries.getResourceById(id)
  //   .then((resources) => {
  //     return commentQueries.getComments(id)
  //       .then((comments) => {
  //         return commentQueries.getTotalComments(id)
  //           .then((totalComments) => {
  //             return ratingQueries.avgRating(id)
  //               .then((avgRating) => {
  //                 if (!avgRating) {
  //                   avgRating = {'resource_id': id, 'avg_rating': '0' };
  //                 }
  //                 res.render('resource', { resources, comments, totalComments, avgRating});
  //               });
  //           });
  //       });
  //   })
  Promise.all([
    resourceQueries.getResourceById(id),
    commentQueries.getComments(id),
    commentQueries.getTotalComments(id),
    ratingQueries.avgRating(id)
  ])
    .then(([resources, comments, totalComments, avgRating]) => {
      if (!avgRating) {
        avgRating = {'resource_id': id, 'avg_rating': '0' };
      }
      res.render('resource', { resources, comments, totalComments, avgRating });
    })
    .catch((error) => {
      console.error("Error retrieving resource detail:", error);
      res.status(500).json({ error: "Failed to retrieve resource in detail page" });
    });
});

// router.get('/category/:category_id', (req, res)=>{
//   const { category_id } = req.params;
//   console.log("---------", category_id);
//   resourceQueries.getResourceByCategoryId().then(resources=>{
//     let templateVars = {
//       resources,
//     };
//     console.log("the templatevars to categorize:",templateVars);
//     // return res.send(data);
//     res.render('index',{resources, userId: 1});
//   });
// });

module.exports = router;
