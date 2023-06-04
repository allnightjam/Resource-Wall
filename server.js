// load .env data into process.env
require('dotenv').config();

const { getMaxIDFromResource, addResource } = require('./db/queries/resources');
const { getMaxIDFromUsers, addNewUser } = require('./db/queries/users');
const { getUserByEmail, authenticateUser, isLoggedIn } = require('./help');
const { getCategories } = require('./db/queries/category');

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
app.use(express.urlencoded({ extended: true }));
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
const getResourceRoutes = require('./routes/getResources');


// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/api/users', userApiRoutes);
app.use('/api/widgets', widgetApiRoutes);
app.use('/users', usersRoutes);
app.use('/categories',categoriesRoutes);
app.use('/addResource',resourceRoutes);
app.use('/',getResourceRoutes);
app.use('/myresources', getResourceRoutes);
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get('/', (req, res) => {
  let templateVars = {
    userId: null
  };
  if (isLoggedIn(req.session.user_id)) {

    templateVars = {
      userId: req.session.user_id
    };
  };

  return res.render('index', templateVars);

});

app.get('/addresource', (req, res)=>{
  getCategories().then(data=>{
    let templateVars = {
      resources: data,
    };

    return res.render('addresource', templateVars);
  });

});

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
  res.render("login");
});

app.get("/search", (req,res) => {
  res.render("search");
});

app.post("/search", (req, res)=>{

})

app.get("/profile", (req,res) => {
  res.render("profile");
});

app.get("/resource", (req, res)=>{
  res.render("resource");
})

app.post("/register", (req,res) => {
  let userId = '';

  console.log('=========================try to get user id from users table=========================');
  // get max id from users table
  getMaxIDFromUsers().then(id=>{
    userId = Number(id) +1;
    console.log(`======USER ID=======${userId}=================`);

    const { username, email, password } = req.body;

    if(email === '' || username === '' || password === ''){
      return res.status(400).send('username, email and password cannot be empty');
    }

    if(getUserByEmail(email)){
      // user has already exist
      return res.status(400).send('user is already registered');
    }

    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = {
      id: Number(userId),
      username,
      email,
      password: hashedPassword,
      avatar: 'https://icons.iconarchive.com/icons/papirus-team/papirus-status/256/avatar-default-icon.png',
      profile_description: 'say something about you'
    }

    addNewUser(user);

    req.session.user_id = userId;

    return res.redirect('/');
    })


});

app.post("/login", (req,res) => {
  const { email, password } = req.body;

  console.log(email, password);
  if (email === '' || password === '') {
    return res.status(400).send('email and password cannot be empty');
  }

  authenticateUser(email, password).then(result=>{
    const { err, user } =  result;

    if (err) {
      return res.json(err);
    }

    req.session.user_id = user.id;
    return res.redirect('/');
  })


});

app.post("/addResource", (req, res)=>{
  const { title, description, resource_url, photo_url, category_id } = req.body;
  console.log(`----ADD RESOURCE---${title}--${description}---${resource_url}---${photo_url}---${category_id}----`);

  getMaxIDFromResource().then(id=>{

    let resourceId = 1;
    if(id){
      resourceId = id+1;
    }

    const newResource = {
      id: resourceId,
      title,
      description,
      resource_url,
      photo_url,
      category_id,
      user_id: req.session.user_id
    }

    console.log(newResource);

    addResource(newResource).then(result=>{
        console.log(result);

        return res.redirect('/');
    }).catch(err=>{
      console.log(err);
    })

  })


})

app.post("/logout", (req,res) => {
  req.session = null;
  res.redirect("/login");
});


