const interestedproController = require('../controllers/interestedpro');
const usersController = require('../controllers/users');

const router = require('express').Router();

router.post('/mark',usersController.authentication, interestedproController.markInterested);
router.post('/all',usersController.authentication, interestedproController.getAllInterested);


module.exports = router;