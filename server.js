// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');

const PORT = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const userApiRoutes = require('./routes/users-api');
const widgetApiRoutes = require('./routes/widgets-api');
const usersRoutes = require('./routes/users');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/api/users', userApiRoutes);
app.use('/api/widgets', widgetApiRoutes);
app.use('/users', usersRoutes);
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get('/', (req, res) => {
  res.render('index');
});

/////////////////////////////////////
const users = {
  aJ48lW: {
    id: "aJ48lW",
    email: "user@example.com",
    password: "$2a$10$xO9o0DnDc4hWZIXYPhU6V.5oufJcp7EwlA0MjPl/2wHcJfORiTXMK",
  },
  user2RandomID: {
    id: "user2RandomID",
    email: "user2@example.com",
    password: "$2a$10$xO9o0DnDc4hWZIXYPhU6V.5oufJcp7EwlA0MjPl/2wHcJfORiTXMK",
  },
};

function generateRandomString() {
  let result = "";
  const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const length = 6;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * length));
    counter += 1;
  }
  return result;
}

const getUserByEmail = function(email, database) {
  for (let user in database) {
    if (database[user].email === email){
      return database[user];
    }
  }
  return null;
};

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/login", (req,res) => {
  const user = users[req.body.id]
  const templateVars = { user: false };
  res.render("login", templateVars);
});

app.get("/search", (req,res) => {
  res.render("search");
});

app.get("/profile", (req,res) => {
  res.render("profile");
});

app.post("/register", (req,res) => {
  const user = getUserByEmail(req.body.email,users);
  const newUser = {
    id: generateRandomString(6),
    email: req.body.email,
    password: req.body.password,
  };
  if (req.body.email === "" || req.body.password === "") {
    return res.status(400).send("Email And/Or Password Invalid");
  }
  if (user && user.email === newUser.email) {
    return res.status(400).send("Email Taken");
  }
  users[newUser.id] = newUser;
  req.body.id = newUser.id
  res.redirect("/");
});

app.post("/login", (req,res) => {
  const user = getUserByEmail(req.body.email, users);
  if (!user) {
    return res.status(403).send("Email And/Or Password Invalid");
  }
  if (req.body.password === user.password) {
    req.body.id = user.id;
    return res.redirect('/');
  }
  return res.status(403).send("Email And/Or Password Invalid");
});

app.post("/logout", (req,res) => {
  req.session = null;
  res.redirect("/login");
});

app.post("/profile", (req,res) => {
  res.render("profile");
});


