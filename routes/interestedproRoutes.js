const interestedproController = require('../controllers/interestedpro');
const usersController = require('../controllers/users');

const router = require('express').Router();


//check if the user is authenticated before showing interest to properties
router.post('/mark',usersController.authentication, interestedproController.markInterested);

//check if the user is authenticated before listing of interested properties
router.post('/all',usersController.authentication, interestedproController.getAllInterested);


module.exports = router;