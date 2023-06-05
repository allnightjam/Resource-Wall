/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

const profileQueries = require('../db/queries/users');

// router.get('/', (req, res) => {
//   res.render('users');
// });

router.get('/', (req, res) => {
  const userId = req.session.user_id;
  profileQueries.getUsersById(userId)
    .then((users) => {
      console.log("get user from db :", users);
      res.render('userprofile',{users});
    })
    .catch((error) => {
      console.error("Error retrieving user-profile:", error);
      res.status(500).json({ error: "Failed to retrieve user-profile" });
    });
});


router.post('/', (req, res) => {
  const data = req.body;
  const userId = req.session.user_id;
  profileQueries.updateProfile(data,userId)
    .then((data) => {
      if (!data) {
        return res.send({ error: "error" });
      }
      res.redirect('/userprofile');
    })
    .catch((error) => {
      console.error("Error update profile:", error);
      res.status(500).json({ error: "Failed to update profile" });
    });
});

module.exports = router;
