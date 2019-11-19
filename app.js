// Express server the main frame work
const express = require("express");
const app = express();

const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI

const bodyParser = require('body-parser');
const passport = require('passport');

// Routes import
const users = require("./routes/api/users");
const Requests = require("./routes/api/wash_requests");



// Middleware for body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Middleware for Passport
app.use(passport.initialize());
require('./config/passport')(passport);

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));


const port = process.env.PORT || 5000;
// Tell Express to start a socket and listen for connections on the pathWWnp
app.listen(port, () => console.log(`Server is running on port ${port}`));




// Express to use the imported routes above
app.use("/api/users", users);
app.use("/api/requests", Requests);


  