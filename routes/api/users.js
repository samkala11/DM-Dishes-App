const express = require("express");
const router = express.Router();

const bcrypt = require('bcryptjs');
const User = require('../../models/User');

const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

const passport = require('passport');

const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');



router.post('/register', (req, res) => {

    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    // Check to make sure nobody has already registered with a duplicate email
    User.findOne({ email: req.body.email })
      .then(user => {
        if (user) {
          // Throw a 400 error if the email address already exists
          return res.status(400).json({email: "A user has already registered with this email address"})
        } else {
          // Otherwise create a new user
          const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            customerFlag: req.body.customerFlag,
            washerFlag: !req.body.customerFlag
          })
  
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser.save()
                .then(user => res.json(user))
                .catch(err => console.log(err));
            })
          })
        }
      })
})




router.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }
  
    const email = req.body.email;
    const password = req.body.password;
  
    User.findOne({email})
      .then(user => {
        if (!user) {
          return res.status(404).json({email: 'This user does not exist'});
        }
  
        bcrypt.compare(password, user.password)
          .then(isMatch => {
            if (isMatch) {
                const payload = {
                    id: user.id, 
                    name: user.name,
                    email: user.email,
                    washerFlag: user.washerFlag,
                    customerFlag: user.customerFlag,
                    admin: user.admin,
                    completedJobs: user.completedJobs,
                    completedCustomerRequests: user.completedCustomerRequests,
                    timeStamp: user.timeStamp,
                    bio: user.bio,
                    positiveReviews: user.positiveReviews,
                    negativeReviews: user.negativeReviews
                };
          
                jwt.sign(
                  payload,
                  keys.secretOrKey,
                  // Tell the key to expire in one hour
                  {expiresIn: 3600},
                  (err, token) => {
                    res.json({
                      success: true,
                      token: 'Bearer ' + token,
                      id: user.id, 
                      name: user.name,
                      email: user.email,
                      washerFlag: user.washerFlag,
                      customerFlag: user.customerFlag,
                      admin: user.admin,
                      completedJobs: user.completedJobs,
                      completedCustomerRequests: user.completedCustomerRequests,
                      timeStamp: user.timeStamp,
                      bio: user.bio,
                      positiveReviews: user.positiveReviews,
                      negativeReviews: user.negativeReviews
                    });
                  });
              } else {
              return res.status(400).json({password: 'Incorrect password. Please try again '});
            }
          })
      })
})


router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
})


router.get('/userInfo', passport.authenticate('jwt', { session: false }), (req, res) => { 
    // console.log(req.user)    
    User.findById(req.user.id)
            .then(user => { console.log(user)
                res.json(user) } )
            .catch(err =>
                res.status(404).json({ noUserFound: 'There are no users with that ID' }))        
}) 


module.exports = router;