// load .env data into process.env
require('dotenv').config();

const { getMaxIDFromResource } = require('./db/queries/resources');
const { getMaxIDFromUsers, addNewUser } = require('./db/queries/users');
const { getUserByEmail } = require('./help')

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const cookieSession = require('cookie-session');
const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(10);
const PORT = process.env.PORT || 8080;
const app = express();
app.use(cookieSession({
  name:'session',
  keys: ['my favorite thing', 'learning'],
}));

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
const categoriesRoutes = require('./routes/categories');
const resourceRoutes = require('./routes/resource');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/api/users', userApiRoutes);
app.use('/api/widgets', widgetApiRoutes);
app.use('/users', usersRoutes);
app.use('/categories',categoriesRoutes);
app.use('/addResource',resourceRoutes);
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get('/', (req, res) => {
  res.render('index');
});


////////////////////////////////////

app.get('/myresources', (req, res)=>{
  res.render('myresources');
})

app.get('/addresource', (req, res)=>{
  res.render('addresource');
})

// app.post('/addresource', (req, res)=>{
//   getMaxIDFromResource().then(id=>{
//     const maxId = id;


//   })
// })

app.get('/userprofile', (req, res)=>{
  res.render('userprofile');
})

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
  let userId = '';

  // get max id from users table
  getMaxIDFromUsers().then(id=>{
    userId = Number(id) +1;
    console.log(userId);
  })

  const { username, email, password } = req.body;

  if(email === '' || username === '' || password === ''){
    return res.status(400).send('username, email and password cannot be empty');
  }

  if(getUserByEmail(email)){
    // user has already exist
    return res.status(400).send('user is already registered');
  }

  const hashedPassword = bcrypt.hashSync(password, salt);

  addNewUser({
    id: userId,
    username,
    email,
    password: hashedPassword
  })

  req.session.user_id = userId;

  res.redirect('/');
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


