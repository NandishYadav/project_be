const usersController = require('./../controllers/users');

const router = require('express').Router();


//register a user
router.post('/register', usersController.createUser);

//login a user
router.post('/login', usersController.loginUser);

module.exports = router;