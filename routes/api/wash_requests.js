const express = require("express");
const router = express.Router();

const mongoose = require('mongoose');
const passport = require('passport');

const Request = require('../../models/Request');

//localhost:5000/api/requests/
// Get All Requests
router.get('/', (req, res) => {
    Request.find()
        .sort({ date: -1 })
        .then(requests => res.json(requests))
        .catch(err => res.status(404).json({ noRequests: 'No requests found' }));
});

// http://localhost:5000/api/requests/emp/5
// Get for a specific employee
router.get('/emp/:user_id', (req, res) => {
    Request.find({washerId: req.params.user_id})
        .then(requests => res.json(requests))
        .catch(err =>
            res.status(404).json({ noRequests: 'No requests found from that user' }
        )
    );
});


// http://localhost:5000/api/requests/customer/5
// Get for a customer
router.get('/customer/:user_id', (req, res) => {
    Request.find({customer: req.params.user_id})
        .then(requests => res.json(requests))
        .catch(err =>
            res.status(404).json({ noRequests: 'No requests found from that user' }
        )
    );
});



// Create a Request
router.post('/',
    passport.authenticate('jwt', { session: false }), 
    
    (req, res) => {customer
      const newRequest = new Request({
        washerId: req.body.washerId,
        customer: req.user.id
      });
      newRequest.save().then(request => res.json(request));
    }
);


router.put('/:request_id', 
passport.authenticate('jwt', { session: false }),
(req, res) => {
    Request.findByIdAndUpdate(req.params.request_id, {
        $set: {'dishesToClean.utensilsCupsAndGlasses': req.body.utensils,
        'dishesToClean.potsAndPans': req.body.pans,
        'dishesToClean.platesBowlsAndContainers': req.body.plates },
    })
    .then(request => {
        console.log(request)
        res.json({result: request })
    })

})


// Get re quest by id
router.get('/:request_id', (req, res) => {
    Request.findById(req.params.request_id)
        .then(requests => res.json(requests))
        .catch(err =>
            res.status(404).json({ noRequests: 'No requests found from that user' }
        )
    );
});



module.exports = router;